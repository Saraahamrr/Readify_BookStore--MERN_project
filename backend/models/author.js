const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "Female","Male"] },
    bio: { type: String },
    dateOfBirth: { type: Date },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Author", authorSchema);
