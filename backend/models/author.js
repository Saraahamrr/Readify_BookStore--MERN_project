const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // Import mongoose-sequence

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "Female","Male"] },
    bio: { type: String },
    dateOfBirth: { type: Date },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    timestamps: true,
  }
);

// Apply AutoIncrement plugin
authorSchema.plugin(AutoIncrement, { inc_field: "authorId" });

module.exports = mongoose.model("Author", authorSchema);
