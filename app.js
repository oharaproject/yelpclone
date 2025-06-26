const ejsMate = require("ejs-mate");
const express = require("express");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  res.render("home");
});

// Mengatur semua rute untuk fitur tempat (place) → CRUD dan tampilan tempat
app.use("/places", require("./routes/places"));

// Mengatur semua rute untuk fitur ulasan (review) berdasarkan ID tempat
// Catatan: :place_id adalah parameter dinamis yang diteruskan ke router review
app.use("/places/:place_id/reviews", require("./routes/reviews"));

// app.all("/*", (req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Server is running on http://127.0.0.1:3000");
});
