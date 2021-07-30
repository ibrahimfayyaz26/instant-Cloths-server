const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Get one User
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});
//Create one User
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    subscribedUser: req.body.subscribedUser,
  });
  try {
    const newSubscriber = await user.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Update one User
router.patch("/:id", getUser, async (req, res) => {
  if(req.body.name != null) {
    res.user.name = req.body.name
  }
  if(req.body.subscribedUser != null) {
    res.user.subscribedUser = req.body.subscribedUser
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch {
    res.status(400).json({message: err.message})
  }
});

//Delete one User
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted This Customer" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "can't find the user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
