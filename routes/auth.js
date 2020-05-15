const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  // Using auth as second parameter uses the middleware, which checks the token and returns the user part of it in req.user
  try {
    const user = await User.findById(req.user.id).select("-password"); // Using select to not include the password with the response, even if it's encrypted we don't want to return it
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" }); // Sending error message is email is not found
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" }); // Sending error message is password doesn't match
      }

      const payload = {
        // Get user id if login is successful
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        // Pass in user id and return token
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000, // Set this to 3600 for production so token expires in one hour. Can use 360000 for testing so don't need to log back in.
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
