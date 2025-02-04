const express = require("express");
const { body } = require("express-validator");
const authorController = require("../controllers/authors.controller.js");

const router = express.Router();

router
  .route("/")
  .get(authorController.getAllAuthors) 
  .post(
    [
      body("name")
        .notEmpty()
        .withMessage("Author name is required")
        .isLength({ min: 2 })
        .withMessage("Author name must be at least 2 characters"),
      body("gender")
        .notEmpty()
        .withMessage("Gender is required")
        .isIn(["male", "female", "other"])
        .withMessage("Gender must be 'male', 'female', or 'other'"),
    ],
    authorController.addAuthor
  );

router
  .route("/:authorId")
  .get(authorController.getAuthor) 
  .patch(
    [
      body("name")
        .notEmpty()
        .withMessage("Author name is required")
        .isLength({ min: 2 })
        .withMessage("Author name must be at least 2 characters"),
      body("gender")
        .notEmpty()
        .withMessage("Gender is required")
        .isIn(["male", "female","Male","Female"])
        .withMessage("Gender must be 'male', 'female', or 'other'"),
    ],
    authorController.updateAuthor
  )
  .delete(authorController.deleteAuthor); // Delete author by ID

module.exports = router;
