const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middlewares/isValidObjectId");

// models
const Place = require("../models/place");

// schemas
const { placeSchema } = require("../schemas/place");

const ExpressError = require("../utils/ExpressError");

const router = express.Router();

// middleware
const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(msg, 400));
  } else {
    next();
  }
};

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const places = await Place.find();
    res.render("places/index", { places });
  })
);

router.get("/create", (req, res) => {
  res.render("places/create");
});

router.post(
  "/",
  validatePlace,
  wrapAsync(async (req, res, next) => {
    const place = new Place(req.body.place);
    await place.save();
    req.flash("success_msg", "Place added successfully!");
    res.redirect("/places");
  })
);

router.get(
  "/:id",
  isValidObjectId("/places"), // Validate the ID format
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id).populate("reviews");
    res.render("places/show", { place });
  })
);

// Edit place route
router.get(
  "/:id/edit",
  isValidObjectId("/places"), // Validate the ID format
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.render("places/edit", { place });
  })
);

// Update place route
router.put(
  "/:id",
  isValidObjectId("/places"), // Validate the ID format
  validatePlace,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndUpdate(id, { ...req.body.place });
    res.redirect("/places");
  })
);

router.delete(
  "/:id",
  isValidObjectId("/places"), // Validate the ID format
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.redirect("/places");
  })
);

module.exports = router;
