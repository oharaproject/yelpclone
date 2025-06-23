const mongoose = require("mongoose");

// schema adalah blueprintnya

const Schema = mongoose.Schema;

const placeSchema = Schema({
  title: String,
  price: String,
  description: String,
  location: String,
  image: String,
});

// model adalah alat untuk berinteraksi dengan database

module.exports = mongoose.model("Place", placeSchema);
