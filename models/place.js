const mongoose = require("mongoose");
const Review = require("./review");

// schema adalah blueprintnya

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// setelah tempat dihapus, hapus juga semua review yang terkait
placeSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

// model adalah alat untuk berinteraksi dengan database
module.exports = mongoose.model("Place", placeSchema);
