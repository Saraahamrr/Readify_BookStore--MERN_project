// const express = require("express");
// const router = express.Router();
// //const Book = require("../models/book");
// const searchBooks = require("../controllers/searchController.js")

// router.get("/search", async (req, res) => {
//   try {
//     const query = req.query.query?.trim();
//     if (!query) {
//       return res.status(400).json({ message: "Query parameter is required" });
//     }
//     const books = await Book.find({
//       $or: [
//         { title: { $regex: query, $options: "i" } },
//         { categories: { $regex: query, $options: "i" } },
//       ],
//     }).limit(10);
//     res.json({ results: books.length ? books : [] });
//   } catch (error) {
//     console.error("Error occurred:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


// router.get('/search', async (req, res) => {
//   try {
//     await searchBooks.searchBooks(req, res);
//   } 
//   catch (err) {
//     console.error("❗ Internal server error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const searchBooks = require("../controllers/searchController");

router.get('/', async (req, res) => {
  try {
    await searchBooks(req, res);
  } catch (err) {
    console.error("❗ Internal server error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;