const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../../config/main");

authRouter.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: "Please enter email and password" });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    console.log(newUser.email + " " + newUser.password);

    //saving user
    newUser.save(function(err) {
      if (err) {
        console.log(err.message);
        return res.json({ success: false, message: err.message });
      }
      const token = jwt.sign(newUser.toJSON(), config.secret, {
        expiresIn: 86400
      });
      res.json({
        success: true,
        message: "new user added",
        token: `JWT ${token}`
      });
    });
  }
});

authRouter.post("/auth", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.json({ success: false, message: "Error. User not found." });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            console.log("sign user: " + user);
            const token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 86400 //in seconds(equal to 1 day)
            });
            res.json({ success: true, token: `JWT ${token}` });
          } else {
            res.json({ success: false, message: "Wrong password" });
          }
        });
      }
    })
    .catch(err => console.log(err.message));
});

authRouter.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    console.log("request user: " + req.user);
    res.send(`It works! User id is: ${req.user._id}`);
  }
);
module.exports = authRouter;
