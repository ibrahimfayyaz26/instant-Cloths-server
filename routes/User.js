const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//Get one User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//Create one User
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
    email: req.body.email,
  });
  try {
    const newSubscriber = await user.save();
    res.status(201).send(newSubscriber);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
//Update one User
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
      email: req.body.email,
    },
    {
      new: true,
    }
  )
    .then((i) => {
      res.send(i);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
});

//Delete one User
router.delete("/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((i) => res.send(i))
    .catch((err) => res.status(400).send({ message: err.message }));
});

module.exports = router;
