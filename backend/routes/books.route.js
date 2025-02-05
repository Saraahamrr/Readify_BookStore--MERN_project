const express = require("express");
const { body } = require("express-validator");
const bookController = require("../controllers/books.controller.js");
const router = express.Router();
console.log("+++++++++++++++++++++++++", bookController);
router
  .route("/")
  .get(bookController.getAllBooks)
  .post(
    [
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
      body("price").notEmpty().withMessage("Price is required").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    ],
    bookController.addBook
  );

router
  .route("/:bookId")
  .get(bookController.getBook)
  .patch(
    [
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
      body("price").notEmpty().withMessage("Price is required").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    ],bookController.updateBook)
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

  
module.exports = router;