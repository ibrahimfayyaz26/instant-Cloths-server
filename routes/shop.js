const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");

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
router.post("/", upload.single("image"), async (req, res) => {
  // let imagesFormat = [];

  // req.file.map((fileT) => {
  //   imagesFormat.push(
  //     `${req.protocol}://${req.get("host")}/uploads/${fileT.fileName}`
  //   );
  // });

  const shop = new Shop({
    name: req.body.name,
    image: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
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
//update one shop
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
      orders: req.body.orders,
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
