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
        .isIn(["male", "female", "Female","Male"])
        .withMessage("Gender must be 'male', 'female'"),
      body("bio")
        .isString()
        .withMessage("Bio must be a string describing the author"),
      body("dateOfBirth")
        .isISO8601()
        .withMessage("Date of Birth must be a valid ISO 8601 date"),
      body("image")
        .optional()
        .isString()
        .withMessage("Please provide image URL")
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
        .isIn(["male", "female", "other"])
        .withMessage("Gender must be 'male', 'female'"),
        body("bio")
        .isString()
        .withMessage("Bio must be a string describing the author"),
      body("dateOfBirth")
        .isISO8601()
        .withMessage("Date of Birth must be a valid ISO 8601 date"),
      body("image")
        .optional()
        .isString()
        .withMessage("Please provide image URL")
    ],
    authorController.updateAuthor
  )
  .delete(authorController.deleteAuthor);

module.exports = router;
