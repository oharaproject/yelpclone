const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  wrapAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      await User.register(user, password);
      req.flash("success_msg", "Registration successful! You can now log in.");
      res.redirect("/places");
    } catch (error) {
      req.flash("error_msg", "Registration failed. Please try again.");
      res.redirect("/register");
    }
  })
);

module.exports = router;
