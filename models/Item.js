const mongoose = require("mongoose");

const Item = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  images: [{ type: String }],
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Item", Item);
