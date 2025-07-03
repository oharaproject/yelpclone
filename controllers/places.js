const Place = require("../models/place");

// index
module.exports.index = async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
};

// place create post & save
module.exports.store = async (req, res, next) => {
  const place = new Place(req.body.place);
  place.author = req.user._id;
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
  await Place.findByIdAndUpdate(id, { ...req.body.place });
  req.flash("success_msg", "Place updated successfully!");
  res.redirect(`/places/${id}`);
};

// delete place
module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.redirect("/places");
};
