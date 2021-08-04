const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const ChatContainer = require("../models/ChatContainer");

//Get all Chats
router.get("/", async (req, res) => {
  try {
    const Chats = await ChatContainer.find()
      .populate("users")
      .populate("meassages")
      .sort({ date: -1 });
    res.send(Chats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Get one Chat
router.get("/:id", async (req, res) => {
  try {
    const Chats = await ChatContainer.findById(req.params.id)
      .populate("users")
      .populate("meassages");
    res.send(Chats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Create one Chat
router.post("/", async (req, res) => {
  const nChat = new ChatContainer({
    users: req.body.users,
  });

  try {
    const newChat = await nChat.save();
    res.status(201).send(newChat);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//Add Message
router.put("/:id", async (req, res) => {
  const ChatId = req.params.id;

  const message = new Chat({
    message: req.body.message,
  });

  const Chats = await ChatContainer.findById(ChatId).select("meassages");

  let newMessages = Chats.messages;

  newMessages.push(message._id);

  try {
    const updatedChat = await ChatContainer.findByIdAndUpdate(
      ChatId,
      {
        messages: newMessages,
      },
      {
        new: true,
      }
    );
    res.send(updatedChat);
  } catch {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
