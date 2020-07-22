const mongoose = require("mongoose");

const DrinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const DrinkModel = mongoose.model("Drink", DrinkSchema);

module.exports = DrinkModel;
