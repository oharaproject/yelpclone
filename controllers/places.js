const Place = require("../models/place");
const fs = require("fs");
const ExpressError = require("../utils/ExpressError");
const { default: next } = require("next");

// index
module.exports.index = async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
};

// place create post & save
module.exports.store = async (req, res, next) => {
  const images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  const place = new Place(req.body.place);
  place.author = req.user._id;
  place.images = images;

  await place.save();

  req.flash("success_msg", "Place added successfully!");
  res.redirect("/places");
};

// show place
module.exports.show = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("places/show", { place });
};

// edit place
module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render("places/edit", { place });
};

// update place
module.exports.update = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, { ...req.body.place });

  if (req.files && req.files.length > 0) {
    // delete old images
    place.images.forEach((image) => {
      fs.unlink(image.url, (err) => new ExpressError(err));
    });

    // add new images
    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    place.images = images;
    await place.save();
  }

  req.flash("success_msg", "Place updated successfully!");
  res.redirect(`/places/${id}`);
};

// delete place
module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);

  if (place.images.length > 0) {
    place.images.forEach((image) => {
      fs.unlinkSync(image.url);
    });
  }

  await Place.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Place Deleted!");
  res.redirect("/places");
};

// delete image from place
module.exports.destroyImages = async (req, res) => {
  try {
    const { id } = req.params;
    const { images } = req.body;

    // Cek apakah model Place ditemukan berdasarkan ID-nya
    const place = await Place.findById(id);
    if (!place) {
      req.flash("error_msg", "Place not found");
      return res.redirect(`/places/${id}/edit`);
    }

    if (!images || images.length === 0) {
      req.flash("error_msg", "Please select at least one image");
      return res.redirect(`/places/${id}/edit`);
    }

    // Hapus file gambar dari sistem file
    images.forEach((image) => {
      fs.unlinkSync(image);
    });

    // Hapus data gambar dari model Place
    await Place.findByIdAndUpdate(
      id,
      { $pull: { images: { url: { $in: images } } } },
      { new: true }
    );

    req.flash("success_msg", "Successfully deleted images");
    return res.redirect(`/places/${id}/edit`);
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Failed to delete images");
    return res.redirect(`/places/${id}/edit`);
  }
};
