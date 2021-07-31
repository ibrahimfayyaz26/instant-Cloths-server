const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const multer = require("multer");

//Multer
const file_type = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    const fileT = file_type[file.mimetype];
    let err = new Error("wrong image type");
    if (fileT) {
      err = null;
    }
    cd(err, "uploads");
  },
  filename: (req, file, cd) => {
    const fileT = file_type[file.mimetype];
    const fileName = `${file.originalname
      .split(" ")
      .join()}-${Date.now()}.${fileT}`;
    cd(null, fileName);
  },
});

const upload = multer({ storage: storage });

//Get all Items
router.get("/", async (req, res) => {
  try {
    const Items = await Item.find();
    res.send(Items);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//Get one Item
router.get("/:id", async (req, res) => {
  try {
    const Item = await Item.findById(req.params.id);
    res.send(Item);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//Create one Item
router.post("/", upload.array("images"), async (req, res) => {
  let imagesFormat = [];

  req.files.map((fileT) => {
    imagesFormat.push(
      `${req.protocol}://${req.get("host")}/uploads/${fileT.filename}`
    );
  });

  const item = new Item({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description,
    richDescription: req.body.richDescription,
    images: imagesFormat,
    price: req.body.price,
    countInStock: req.body.countInStock,
    shop: req.body.shop,
    category: req.body.category,
  });
  try {
    const newItem = await item.save();
    res.status(201).send(newItem);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
//Update one Item
router.put("/:id", (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      size: req.body.size,
      description: req.body.description,
      richDescription: req.body.richDescription,
      price: req.body.price,
      countInStock: req.body.countInStock,
      category: req.body.category,
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

//Delete one Item
router.delete("/:id", async (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then((i) => res.send(i))
    .catch((err) => res.status(400).send({ message: err.message }));
});

module.exports = router;
