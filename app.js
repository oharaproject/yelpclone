const ejsMate = require("ejs-mate");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const { date } = require("joi");
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
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "this-is-a-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

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
