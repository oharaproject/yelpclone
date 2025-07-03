const User = require("../models/user");

// form register
module.exports.registerForm = (req, res) => {
  res.render("auth/register");
};

// register
module.exports.register = async (req, res) => {
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
};

// login form
module.exports.loginForm = (req, res) => {
  res.render("auth/login");
};

// login
module.exports.login = (req, res) => {
  req.flash("success_msg", "Login successful!");
  res.redirect("/places");
};

// logout
module.exports.logout = (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You have been logged out!");
    res.redirect("/login");
  });
};
