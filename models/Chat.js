const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
});

module.exports = mongoose.model("Chat", Chat);
