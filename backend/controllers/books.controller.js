const { validationResult } = require("express-validator");
const Book = require("../models/book");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleWare/asyncWrapper");
const appError = require("../utils/appError");
const Author = require("../models/author");
const Category = require("../models/category");
const getAllBooks = asyncWrapper(async (req, res, next) => {
  //for pagination
  const query = req.query;
  const limit = query.limit || 12;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  // const books = await Book.find({}, { __v: false }).limit(limit).skip(skip) .populate('category', 'name').populate('author', 'name');;

  const books = await Book.find({}, { __v: false })
    .populate("categories", "name")
    .populate("authors", "name");
  res.json({ status: httpStatusText.SUCCESS, books });
});

const getBook = asyncWrapper(async (req, res, next) => {
  const book = await Book.findOne(
    { _id: req.params.bookId},  
    { __v: false }
  )
  .populate("authors")
  .populate("categories");

  if (!book) { 
    const error = appError.create("Book NOT FOUND!", 404, httpStatusText.FAIL);
    return next(error);
  }
  
  res.json({ status: httpStatusText.SUCCESS, book });
});



const addBook = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const { id, ...bookData } = req.body;
  const newBook = new Book(
    bookData
  );

  console.log("Saving new book:", newBook);
  await newBook.save(); 

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { book: newBook },
    msg : "Book added successfully"
  });
});




const updateBook = asyncWrapper(async (req, res, next) => {
  const { id, ...bookData } = req.body;

  const updatedBook = await Book.findOneAndUpdate(
    { _id: req.params.bookId },
    bookData,
    { new: true, runValidators: true }
  );

  if (!updatedBook) {
    const error = appError.create("Book NOT FOUND!", 404, httpStatusText.FAIL);
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { book: updatedBook } });
});

const deleteBook = asyncWrapper(async (req, res, next) => {
  const book = await Book.findOne({ _id: req.params.bookId });

  if (!book) {
    const error = appError.create("Book NOT FOUND!", 404, httpStatusText.FAIL);
    return next(error);
  }

  const deletedcount = await Book.deleteOne({
    _id: req.params.bookId,
  });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null,msg:"Book deleted successfully" });
});



// const addRating = asyncWrapper(async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
//   }
   
//   const { id, ratingValue, review } = req.body;
//   const { bookId } = req.params;

//   console.log("Fetching book...");
//   const book = await Book.findOne({ _id: bookId });
//   if (!book) {
//     return next(appError.create("Book NOT FOUND!", 404, httpStatusText.FAIL));
//   }

//   console.log("Checking existing rating...");
//   const existingRating = book.rates.find((r) => r.userId.toString() === id);

//   console.log("Updating rating...");
//   await Book.updateOne(
//     { _id: bookId },
//     existingRating
//       ? { $set: { "rates.$.rating": ratingValue, "rates.$.review": review || "" } } 
//       : { $push: { rates: { id, rating: ratingValue, review: review || "" } } }
//   );
  
//   console.log("Fetching updated book...");
//   const updatedBook = await Book.findOne({ _id: bookId });

//   console.log("Calculating new average rating...");
//   const newAvgRating = updatedBook.rates.length > 0
//     ? updatedBook.rates.reduce((sum, r) => sum + r.rating, 0) / updatedBook.rates.length
//     : 0;

//   console.log("New average rating:", newAvgRating);

//   await Book.updateOne(
//     { _id: bookId },
//     { $set: { averageRating: newAvgRating } }
//   );

//   console.log("Sending response now...");
//   res.status(200).json({
//     status: httpStatusText.SUCCESS,
//     data: { book: updatedBook },
//   });
//   console.log("Response sent!");
// });



const addRating = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
  }

  const { id, ratingValue, review } = req.body;
  const { bookId } = req.params;

  console.log("Fetching book...");
  const book = await Book.findById(bookId);
  if (!book) {
    return next(appError.create("Book NOT FOUND!", 404, httpStatusText.FAIL));
  }
  
  console.log("Checking existing rating...");
  const existingRating = book.rates.find((r) => r.userId.toString() === id);

  if (existingRating) {
    existingRating.rating = ratingValue;
    existingRating.review = review || "";
  } else {
    book.rates.push({ userId: id, rating: ratingValue, review: review || "" });
  }

  console.log("Calculating new average rating...");
  const totalRatings = book.rates.length;
  const sumRatings = book.rates.reduce((sum, r) => sum + r.rating, 0);
  book.averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
  
  await book.save();

  console.log("Sending response...");
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { book },
    msg: "Rating added successfully",
  });
});


module.exports = {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  addRating,
};
