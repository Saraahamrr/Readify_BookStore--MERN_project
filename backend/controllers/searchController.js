//const Book = require("../models/book");



// const searchBooks = async (req, res) => {
//   const query = req.query.query;
//   console.log("📩 Received search query:", query);

//   if (!query) {
//     console.log("❌ No query provided");
//     return res.status(400)
//     .json({msg:"query is required"})
//     .send('Query is required');
//   }

//   try {
//     console.log("🔎 Searching in database...");

//     const books = await Book.find({
//       $or: [
//         { title: { $regex: query, $options: 'i' } },
//         { 'authors.Name': { $regex: query, $options: 'i' } }
//       ]
//     });

//     console.log("✅ Books found:", books.length);
//     res
//     .status(200)
//     .json({ status: "SUCCESS", results: books });
//   } catch (err) {
//     console.error("❗ Error fetching books:", err);
//     res.status(500).send('Error fetching books');
//   }
// };

// module.exports = searchBooks;

const Book = require("../models/book");

const searchBooks = async (req, res) => {
  const query = req.query.query;
  console.log("📩 Received search query:", query);

  if (!query) {
    console.log("❌ No query provided");
    return res.status(400).json({ status: "FAIL", message: "Query is required" });
  }

  try {
    console.log("🔎 Searching in database...");

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { 'authors.Name': { $regex: query, $options: 'i' } }
      ]
    });

    console.log("✅ Books found:", books.length);
    res.status(200).json({ status: "SUCCESS", results: books });
  } catch (err) {
    console.error("❗ Error fetching books:", err);
    res.status(500).json({ status: "ERROR", message: "Error fetching books" });
  }
};

module.exports = searchBooks;
