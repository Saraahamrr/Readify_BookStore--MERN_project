const { validationResult } = require("express-validator");
const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.find({
      title: new RegExp(req.params.bookTitle, "i"),
    });
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    return res.status(400).json({ msg: "Invalid obj id" });
  }
};

const addBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.updateOne(
      { title: req.params.bookTitle },
      { $set: { ...req.body } }
    );
    return res.status(200).json({ msg: updatedBook });
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedcount = await Book.deleteOne({
      title: req.params.bookTitle,
    });
    return res.status(200).json({ msg: deletedcount });
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
};
