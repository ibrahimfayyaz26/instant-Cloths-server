const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");

//get all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.send(shops);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//get one shop
router.get("/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.send(shop);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//create shop
router.post("/", async, (res, res) => {
  const shop = new Shop({
    name: req.body.name,
    image: req.body.image,
    rating: req.body.rating,
    user: req.body.user,
    street: req.body.street,
    city: req.body.city,
    country: req.body.country,
    coordinates: req.body.coordinates,
  });
  try {
    const newShop = await shop.save();
    res.status(201).send(newShop);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
//update shop
router.put("/:id", (req, res) => {
  Shop.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      rating: req.body.rating,
      user: req.body.user,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      coordinates: req.body.coordinates,
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
//Delete one shop
router.delete("/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((i) => res.send(i))
    .catch((err) => res.status(400).send({ message: err.message }));
});

module.exports = router;
