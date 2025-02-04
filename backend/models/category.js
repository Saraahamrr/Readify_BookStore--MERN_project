const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // Import mongoose-sequence

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  }, {
    timestamps: true,
  });
  categorySchema.plugin(AutoIncrement, { inc_field: "catId" });

  module.exports = mongoose.model("Category", categorySchema);
  