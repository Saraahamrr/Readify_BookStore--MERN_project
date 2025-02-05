const { validationResult } = require("express-validator");
const Book = require("../models/book");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleWare/asyncWrapper");
const appError = require("../utils/appError");
const getAllBooks = asyncWrapper(async (req, res, next) => {
  //for pagination
  const query = req.query;
  const limit = query.limit || 8;
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
  );

  if (book.length < 1) {
    const error = appError.create("Book NOT FOUND!", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, book });
});

const addBook = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }
  const newBook = new Book(req.body);
  await newBook.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { book: newBook } });
});

const updateBook = asyncWrapper(async (req, res, next) => {
  const book = await Book.findOne({ id: req.params.bookId });

  if (!book) {
    const error = appError.create("Book NOT FOUND!", 404, httpStatusText.FAIL);
    return next(error);
  }
  const updatedBook = await Book.updateOne(
    { id: req.params.bookId },
    { $set: { ...req.body } }
  );
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
const searchBooks = async (req, res) => {
  const query = req.query.query;  // أخذ الـ query من الـ URL
  if (!query) return res.status(400).send('Query is required');

  try {
    // البحث في قاعدة البيانات باستخدام $text (لو فيه text index موجود)
    const books = await Book.find({
      $text: { $search: query }  // لو عندك text index في الـ database
    });
    res.json({ results: books });
  } catch (err) {
    res.status(500).send('Error fetching books');
  }
};

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  searchBooks,  
  addRating,
};