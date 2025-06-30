const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const { route } = require("./places");
const passport = require("passport");
const { default: next } = require("next");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  wrapAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registerUser = await User.register(user, password);
      req.login(registerUser, (err) => {
        if (err) return next(err);
        req.flash(
          "success_msg",
          "Registration successful! You are registered and logged in."
        );
        res.redirect("/places");
      });
    } catch (error) {
      req.flash("error_msg", "Registration failed. Please try again.");
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: {
      type: "error_msg",
      message: "Invalid username or password. Please try again.",
    },
  }),
  (req, res) => {
    req.flash("success_msg", "Login successful!");
    res.redirect("/places");
  }
);

router.post("/logout", (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You have been logged out!");
    res.redirect("/login");
  });
});

module.exports = router;
