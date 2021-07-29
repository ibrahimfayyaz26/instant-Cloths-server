const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

//Get all Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one Category
router.get("/:id", getCategory, (req, res) => {
  res.json(res.category);
});
//Create one Category
router.post("/", (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update one Category
router.patch("/:id", getCategory, (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name;
  }
  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

//Delete one Category
router.delete("/:id", getCategory, (req, res) => {
  try {
    await res.category.remove();
    res.json({ message: "Delete This Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCategory(req, res, next) {
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "can't find category" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.category = category;
  next();
}

module.exports = router;
