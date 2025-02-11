const { validationResult } = require("express-validator");
const Author = require("../models/author");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleWare/asyncWrapper");
const appError = require("../utils/appError");
const Book = require("../models/book")



const getAllAuthors = asyncWrapper(async (req, res, next) => {
  const authors = await Author.find({}, { __v: false });
  res.json({ status: httpStatusText.SUCCESS, authors });
});



const getAuthor = asyncWrapper(async (req, res, next) => {
  const author = await Author.findById(req.params.authorId, { __v: 0 });

  if (!author) {
    return next(appError.create("Author NOT FOUND!", 404, httpStatusText.FAIL));
  }

  const books = await Book.find({ authors: author._id }).select("title coverImage");

  res.json({
    status: httpStatusText.SUCCESS,
    author,
    books, 
  });
});




const addAuthor = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
  }

  const newAuthor = new Author(req.body);
  await newAuthor.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    author: newAuthor ,
  });
});

const updateAuthor = asyncWrapper(async (req, res, next) => {
  const updatedAuthor = await Author.findOneAndUpdate(
    { _id: req.params.authorId }, 
    req.body, 
    { new: true, runValidators: true }
  );

  if (!updatedAuthor) {
    return next(appError.create("Author NOT FOUND!", 404, httpStatusText.FAIL));
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { updatedAuthor },
    msg: "Author updated successfully"
  });
});

const deleteAuthor = asyncWrapper(async (req, res, next) => {
  const author = await Author.findOne({ _id: req.params.authorId });

  if (!author) {
    return next(appError.create("Author NOT FOUND!", 404, httpStatusText.FAIL));
  }

  await Author.deleteOne({ _id: req.params.authorId });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    msg: "Author deleted successfully",
  });
});

module.exports = {
  getAllAuthors,
  getAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
