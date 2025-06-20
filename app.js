const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

// model
const Place = require("./models/place");
const { error } = require("console");
const place = require("./models/place");

app.get("/", (req, res) => {
  res.render("home");
});

// koneksi mongodb
mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("something went wrong");
  });

app.listen(3000, () => {
  console.log("Server is running on http://127.0.0.1:3000");
});

// app.get("/seed/place", async (req, res) => {
//   const place = new Place({
//     title: "Empire State Building",
//     price: "$999.999",
//     description: "A great building",
//     location: "New York, NY",
//   });

//   await place.save();
//   res.send(place);
// });

app.get("/places", async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
});

app.get("/places/create", (req, res) => {
  res.render("places/create");
});

app.post("/places", async (req, res) => {
  const place = new Place(req.body.place);
  try {
    await place.save();
    res.redirect("/places");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error creating place");
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (!place) {
    return res.status(404).send("Place not found");
  } else {
    res.render("places/show", { place });
  }
});
