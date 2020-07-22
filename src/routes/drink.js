const express = require("express");
const router = require("./user");
const DrinkModel = require("../models/Drink");

router.get("/all", async (req, res) => {
  const drinks = await DrinkModel.find();
  return res.json(drinks);
});

router.post("/create", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newDrink = await DrinkModel.create({ name, price });
    return res.json(newDrink);
  } catch (error) {
    return res.json(error.json);
  }
});

module.exports = router;
