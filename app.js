const ejsMate = require("ejs-mate");
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

// Edit place route
app.get("/places/:id/edit", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (!place) {
    return res.status(404).send("Place not found");
  } else {
    res.render("places/edit", { place });
  }
});

// Update place route
app.put("/places/:id", async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndUpdate(id, { ...req.body.place })
    .then(() => {
      res.redirect("/places");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Error updating place");
    });
});

app.delete("/places/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Place.findByIdAndDelete(id);
    res.redirect("/places");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error deleting place");
  }
});
