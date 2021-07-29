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
router.get("/:id", (req, res) => {});
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
router.patch("/:id", (req, res) => {});

//Delete one Category
router.delete("/:id", (req, res) => {});

module.exports = router;
