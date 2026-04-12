const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    // 2. Check password
    if (user.password !== password) {
      return res.status(400).json("Invalid credentials");
    }

    // 3. Success
    res.json({ message: "Login successful", token: "dummy-token" });

  } catch (err) {
    res.status(500).json("Error in login");
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("SIGNUP HIT:", req.body);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.json({ message: "User created successfully", user });
});
module.exports = router;