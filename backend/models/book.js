const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  authors: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author',  
    required: true
  }],
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  freePages: { type: Number, default: 10 },
  fullContent: { type: String, required: true },
  publisher: {type: String, required: true},
  publishedDate: {type: Date, required:true},
  categories: { type: Array, required: true },
  language: {type: String, required: true},
}, {
  timestamps: true,
});

module.exports = mongoose.model("Book", bookSchema);