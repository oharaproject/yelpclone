module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "You must be logged in to view this page.");
    return res.redirect("/login");
  }
  next();
};
