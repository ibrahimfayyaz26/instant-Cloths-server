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
      .populate("meassages")
      .sort({ date: -1 });
    res.send(Chats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Create one Chat
router.post("/", async (req, res) => {
  const ChatIds = await Promise.all(
    req.body.messages.map(async (Chats) => {
      const od = await new Chat({
        message: Chats,
      });
      const newOd = await od.save();
      return newOd._id;
    })
  );

  const nChat = new ChatContainer({
    messages: ChatIds,
  });

  try {
    const newChat = await nChat.save();
    res.status(201).send(newChat);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//Delete one Chat
router.delete("/:id", async (req, res) => {
  Chat.findByIdAndRemove(req.params.id)
    .then(async (i) => {
      if (i) {
        await i.ChatItems.map(async (item) => {
          await ChatItem.findByIdAndRemove(item);
        });
        return res.send("successfully deleted");
      } else {
        res.send("No Data Is Found");
      }
    })
    .catch((err) => {
      res.status(404).send({ success: false, error: err });
    });
});

module.exports = router;
