const express = require("express");
const UserModel = require("../models/User");

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

module.exports = router;
