const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

//Get all Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Get one Category
router.get("/:id", async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id);
    res.send(categories);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Create one Category
router.post("/", async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();
    res.status(201).send(newCategory);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//Update  Category
router.put("/:id", async (req, res) => {
  const catId = req.params.id;
  if (!catId) {
    res.status(404).send({ success: false, error: "No id" });
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      catId,
      {
        name: req.body.name,
      },
      {
        new: true,
      }
    );
    res.send(updatedCategory);
  } catch {
    res.status(400).send({ message: err.message });
  }
});

//Delete one Category
router.delete("/:id", async (req, res) => {
  const catId = req.params.id;
  if (!catId) {
    res.status(404).send({ success: false, error: "No id" });
  }

  try {
    await Category.findByIdAndRemove(catId);
    res.send({ message: "Delete This Subscriber" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
