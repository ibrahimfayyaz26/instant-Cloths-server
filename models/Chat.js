const mongoose = require("mongoose");

const Chat = mongoose.Schema({
  message: String,
  date: Date.now(),
});

module.exports = mongoose.model("Chat", Chat);
