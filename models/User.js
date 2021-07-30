const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //just like amazon has prime members we can have our subscribed customers
  subscribedUser: {
    type: String,
    required: true,
  },
  //when did he join
  userDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", User);
