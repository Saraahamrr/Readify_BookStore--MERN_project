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

  const books = await Book.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, books });
});

const getBook = asyncWrapper(async (req, res, next) => {
  const book = await Book.find(
    {
      id: req.params.bookId,
    },
    { __v: false }
  ).populate("authors") 
  .populate("categories");

  if (book.length < 1) {
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

  let authorIds = [];
  let categoryIds = [];

  // Handle authors
  for (const authorName of req.body.authors) {
    console.log("Searching for author:", authorName);
    let author = await Author.findOne({ name: authorName }).exec();
    if (!author) {
      console.log("Author not found, creating new author:", authorName);
      author = new Author({ name: authorName });
      await author.save(); // Assuming asyncWrapper handles errors here
    }
    authorIds.push(author._id);
  }

  // Handle categories
  for (const categoryName of req.body.categories) {
    console.log("Searching for category:", categoryName);
    let category = await Category.findOne({ name: categoryName }).exec();
    if (!category) {
      console.log("Category not found, creating new category:", categoryName);
      category = new Category({ name: categoryName });
      await category.save(); // Assuming asyncWrapper handles errors here
    }
    categoryIds.push(category._id);
  }

  const newBook = new Book({
    ...req.body,
    authors: authorIds,
    categories: categoryIds,
  });

  console.log("Saving new book:", newBook);
  await newBook.save(); // Assuming asyncWrapper handles errors here

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { book: newBook },
  });
});

const updateBook = asyncWrapper(async (req, res, next) => {
  const updatedBook = await Book.findOneAndUpdate({ id: req.params.bookId },
    req.body,
    { new: true, runValidators: true });

  if (!updatedBook) {
    const error = appError.create("Book NOT FOUND!", 404, httpStatusText.FAIL);
    return next(error);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { bookLog: updatedBook } });
});

const deleteBook = asyncWrapper(async (req, res,next) => {
  const book = await Book.findOne({ id: req.params.bookId });

  if (!book) {
      const error = appError.create('Book NOT FOUND!', 404, httpStatusText.FAIL);
      return next(error);
  }

  const deletedcount = await Book.deleteOne({
    id: req.params.bookId,
  });
  res.json({ status: httpStatusText.SUCCESS, data: null });
});

const addRating = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
      return next(error);
  }

  const { userId, ratingValue } = req.body;
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
      const error = appError.create('Book NOT FOUND!', 404, httpStatusText.FAIL);
      return next(error);
  }

  // Check if user already rated
  const existingRating = book.ratings.find(r => r.userId.toString() === userId);
  if (existingRating) {
      existingRating.rating = ratingValue; // Update rating
  } else {
      book.ratings.push({ userId, rating: ratingValue });
  }

  // Recalculate average rating
  book.calculateAverageRating();
  await book.save();

  res.status(200).json({ status: httpStatusText.SUCCESS, data: { book } });
});

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  addRating,
};