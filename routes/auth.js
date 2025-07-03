const express = require("express");
const router = express.Router();
const User = require("../models/user");
const AuthController = require("../controllers/auth");
const wrapAsync = require("../utils/wrapAsync");
const { route } = require("./places");
const passport = require("passport");
const { default: next } = require("next");

// register form, register (kelompokan router yang sama)
router
  .route("/register")
  .get(AuthController.registerForm)
  .post(wrapAsync(AuthController.register));

// login form, login (kelompokan router yang sama)
router
  .route("/login")
  .get(AuthController.loginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: {
        type: "error_msg",
        message: "Invalid username or password. Please try again.",
      },
    }),
    AuthController.login
  );

// logout
router.post("/logout", AuthController.logout);

module.exports = router;
