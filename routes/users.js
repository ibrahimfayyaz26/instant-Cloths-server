const express = require("express");
const router = express.Router();

//Get all Users
router.get("/", (req, res) => {
  res.send("Hello Customer");
});
//Get one User
router.get("/:id", (req, res) => {});
//Create one User
router.post("/", (req, res) => {});
//Update one User
router.patch("/:id", (req, res) => {});
//Delete one User
router.delete("/:id", (req, res) => {});

module.exports = router;
