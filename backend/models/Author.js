const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  rate: { type: Number, required: true }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Author", authorSchema);
