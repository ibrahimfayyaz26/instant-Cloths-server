const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const ChatContainer = require("../models/ChatContainer");
const Pusher = require("pusher");
const mongoose = require("mongoose");

const pusher = new Pusher({
  appId: "1244085",
  key: "efab99175a24be44c2c7",
  secret: "37706e86d4620117fe2a",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("connected");

  const msgCollection = db.collection("chatcontainers");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("change", change);
    if (change.operationType === "update") {
      const mD = change.fullDocument;
      pusher.trigger("instant-clothes", "updated", {
        messages: mD.messages,
        users: mD.users,
        date: mD.date,
      });
    }
  });
});

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
