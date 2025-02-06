

const Book = require("../models/book");
const Author = require("../models/author");
const Category = require("../models/category")
const searchBooks = async (req, res) => {
  const query = req.query.query;
  console.log("📩 Received search query:", query);

  if (!query) {
    console.log("No query provided");
    return res.status(400).json({ status: "FAIL", message: "Query is required" });
  }

  try {
    

    const matchingAuthors = await Author.find({ name: { $regex: query, $options: "i" } });
    console.log("👤 Found Authors:", matchingAuthors);

    const matchingAuthorIds = matchingAuthors.map(author => author._id);
    console.log("🆔 Author IDs:", matchingAuthorIds);


    const matchcat = await Category.find({name:{$regex :query , $options:"i"}})
    console.log("👤 Found Cat:", matchcat);
    const matchCatIds = matchcat.map(cat => cat._id);


    console.log("🔎 Searching books...");

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { authors: { $in: matchingAuthorIds } }
        ,{ categories: { $in: matchCatIds } }
      ]
    }).populate("authors")
    .populate("categories")


    console.log("📚 Books Found:", books);

    res.status(200).json({ status: "SUCCESS", results: books });
  } catch (err) {
    console.error("❗ Error fetching books:", err);
    res.status(500).json({ status: "ERROR", message: "Error fetching books" });
  }
};

module.exports = searchBooks;
