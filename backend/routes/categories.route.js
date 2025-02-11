const express = require("express");
const { body } = require("express-validator");
const categoryController = require("../controllers/category.controller.js");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories) 
  .post(
    [
      body("name")
        .notEmpty()
        .withMessage("Category name is required")
    ],
    categoryController.addCategory
  );
router.get("/:categoryId/books", categoryController.getBooksByCategory);

router
  .route("/:categoryId")
  .get(categoryController.getCategory) 
  .patch(
    [
        body("name") 
        .notEmpty()
        .withMessage("Category name is required")
    ],
    categoryController.updateCategory
  )
  .delete(categoryController.deleteCategory); 

module.exports = router;
