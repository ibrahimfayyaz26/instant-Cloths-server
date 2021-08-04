const mongoose = require("mongoose");

const ChatContainer = mongoose.Schema({
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: Date.now(),
});

module.exports = mongoose.model("ChatContainer", ChatContainer);
