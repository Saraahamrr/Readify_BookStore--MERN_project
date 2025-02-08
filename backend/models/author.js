const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "Female","Male"],required:false },
    bio: { type: String, default:"No bio", required:false},
    dateOfBirth: { type: Date,required:false },
    image: {type: String, required:false}
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Author", authorSchema);
