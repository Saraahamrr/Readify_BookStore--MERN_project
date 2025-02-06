
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