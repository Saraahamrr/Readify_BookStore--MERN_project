const mongoose = require("mongoose");
const { type } = require("os");
const AutoIncrement = require("mongoose-sequence")(mongoose); // Import mongoose-sequence

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: {type: String}
});

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    ],
    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    ],
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    freePages: { type: Number, default: 10 },
    fullContent: { type: String, required: true },
    publisher: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    language: { type: String, required: true },
    rates: [ratingSchema],
    averageRating: { type: Number, default: 0 },
    price: {type: Number, default: 0 }
  },
  {
    timestamps: true,
  }
);
bookSchema.plugin(AutoIncrement, { inc_field: "id" });
bookSchema.index({ id: 1 });

bookSchema.methods.calculateAverageRating = function () {
  if (this.rates.length === 0) {
    this.averageRating = 0;
  } else {
    const total = this.rates.reduce((sum, r) => sum + r.rating, 0);
    this.averageRating = total / this.rates.length;
  }
  return this.averageRating;
};

module.exports = mongoose.model("Book", bookSchema);
