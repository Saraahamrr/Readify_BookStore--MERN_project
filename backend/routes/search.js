const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Make sure to import the Book model


router.get('/search', async (req, res) => {
    try {
      const query = req.query.query?.trim();  // الحصول على الاستعلام من الـ URL
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
  
      // البحث في الـ title أو الـ categories مع تحديد عدد النتائج
      const books = await Book.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // البحث في العنوان
          { categories: { $regex: query, $options: "i" } } // البحث في الفئات
        ]
      }).limit(10); // تحديد عدد النتائج المسترجعة إلى 10
  
      res.json({ results: books });  // إرسال النتيجة إلى الـ Frontend
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
