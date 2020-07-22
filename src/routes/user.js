const express = require("express");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.json(users);
  } catch (error) {
    return res.json(error.message);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.json("Email is already used");
    }
    const newUser = await UserModel.create({ username, password, email });
    return res.json({ msg: "Signed up successfully", newUser });
  } catch (error) {
    return res.json(error.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res.json({ msg: "Incorrect email", token: null });
    }
    if (userExists.password === password) {
      const token = jwt.sign(email, "thisismysecretkey");
      return res.json({ msg: "Signed in successfully", token });
    }
  } catch (error) {
    return res.json({ msg: error.message, token: null });
  }
});

module.exports = router;
