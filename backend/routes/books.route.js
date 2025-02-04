const express = require("express");
const { body, validationResult } = require("express-validator");
const bookController = require("../controllers/books.controller.js");
const User = require("../models/user");
const { authToken } = require("./userAuth.js");

const router = express.Router();
//console.log("+++++++++++++++++++++++++", bookController);

const validation = [[
  //   body("id").notEmpty().withMessage("id is required"),
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("Title must be at least 2 characters"),
    body("authors")
      .notEmpty()
      .withMessage("Authors are required")
      .isArray()
      .withMessage("Authors must be an array"),
    body("description").notEmpty().withMessage("Description is required"),
    body("coverImage").notEmpty().withMessage("Cover image is required"),
    body("fullContent").notEmpty().withMessage("Full content is required"),
    body("publisher").notEmpty().withMessage("Publisher is required"),
    body("publishedDate")
      .notEmpty()
      .withMessage("Published date is required")
      .isISO8601()
      .withMessage("Published date must be a valid date"),
    body("categories")
      .notEmpty()
      .withMessage("Categories are required")
      .isArray()
      .withMessage("Categories must be an array"),
    body("language").notEmpty().withMessage("Language is required"),
  ]];


router
  .route("/")
  .get(bookController.getAllBooks)
  .post(validation ,authToken ,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const {id} = req.headers;
    if (!id) {
      return res.status(400).json({msg: "User ID is required"});
    }
    const user = await User.findById(id);
    if (user.role !== "admin" ){
      return res.status(401).json({msg: "Unauthorized"});
    }
    bookController.addBook(req, res);
} catch (error) {
  console.log(error);
  res.status(500).json({msg: "Internal server error"});
}});

router.delete("/:bookId",authToken ,async (req, res) => {
  try {
  const {id} = req.headers;
  if (!id) {
    return res.status(400).json({msg: "User ID is required"});
  }
  const user = await User.findById(id);
  if (user.role !== "admin" ){
    return res.status(401).json({msg: "Unauthorized"});
  }
  bookController.deleteBook(req, res);
} catch (error) {
console.log(error);
res.status(500).json({msg: "Internal server error"});
}});

router.patch("/:bookId",authToken ,async (req, res) => {
  try {
  const {id} = req.headers;
  if (!id) {
    return res.status(400).json({msg: "User ID is required"});
  }
  const user = await User.findById(id);
  if (user.role !== "admin" ){
    return res.status(401).json({msg: "Unauthorized"});
  }
  bookController.updateBook(req, res);
} catch (error) {
console.log(error);
res.status(500).json({msg: "Internal server error"});
}});

router
  .route("/:bookId")
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

router.post(
  "/:bookId/rate",
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("ratingValue")
      .notEmpty()
      .withMessage("Rating is required")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ],
  bookController.addRating
);

    router.get("/search", bookController.searchBooks);
module.exports = router;
