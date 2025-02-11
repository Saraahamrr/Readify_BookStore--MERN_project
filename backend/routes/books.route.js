const express = require("express");
const { body, validationResult,param } = require("express-validator");
const bookController = require("../controllers/books.controller.js");
const User = require("../models/user");
const { authToken } = require("../middleWare/userAuth.js");
const Book = require("../models/book");
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
    body("price").notEmpty().withMessage("Price is required").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
  ]];

  router.get("/recent-books", async (req, res) => {
    try {
      const books = await Book.find().sort({ createdAt: -1 }).limit(6).populate("authors")
      .populate("categories"); //  fetch last 5 books
      res.status(200).json({ success: true, books });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });


router
  .route("/")
  .get(bookController.getAllBooks)
  .post(validation ,authToken ,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {id} = req.body;
      if (!id) {
        return res.status(400).json({msg: "User ID is required"});
      }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
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
  const {id} = req.body;
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

router.patch("/:bookId",validation,authToken ,async (req, res) => {
  try {
  const {id} = req.body;
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
router.get("/:bookId", bookController.getBook);




router.route("/:bookId/rate")
  .post(authToken, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ msg: "User ID is required" });
      }

   
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

    
      bookController.addRating(req, res);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });


module.exports = router;