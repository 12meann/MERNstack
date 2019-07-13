const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// login
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password)
    return res.status(400).json({ msg: "Enter all fields" });

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User not found" });

    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      })
      .catch(err => {
        res.status(500).json({ msg: "Something went wrong" });
      });
  });
});

//get current user data

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      res.json(user);
    });
});

module.exports = router;
