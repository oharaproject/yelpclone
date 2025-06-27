const express = require("express");

// models Place
const Place = require("../models/place");

// models Review
const Review = require("../models/review");

// schemas
const { reviewSchema } = require("../schemas/review");

const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middleware/isValidObjectId");

const router = express.Router({ mergeParams: true });

// middleware untuk validasi data review
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(msg, 400));
  } else {
    next();
  }
};

router.post(
  "/",
  isValidObjectId("/places"), // Validate the place ID format
  validateReview,
  wrapAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const place = await Place.findById(req.params.place_id);
    place.reviews.push(review);
    await review.save();
    await place.save();
    res.redirect(`/places/${req.params.place_id}`);
  })
);

// menghapus data review beserta relasinya
router.delete(
  "/:review_id",
  isValidObjectId("/places"), // Validate the review ID format
  wrapAsync(async (req, res) => {
    const { place_id, review_id } = req.params;
    await Place.findByIdAndUpdate(place_id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/places/${place_id}`);
  })
);

module.exports = router;
