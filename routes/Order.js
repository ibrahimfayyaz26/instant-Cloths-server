const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

//Get all Orders
router.get("/", async (req, res) => {
  try {
    const Orders = await Order.find()
      .populate({
        path: "orderItems",
        populate: "item",
      })
      .populate("shop", "-user", "-orders", "-ratting")
      .populate("user", "-password", "-isAdmin")
      .sort({ date: -1 });
    res.send(Orders);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Get one Order
router.get("/:id", async (req, res) => {
  try {
    const Orders = await Order.findById(req.params.id)
      .populate({
        path: "orderItems",
        populate: "item",
      })
      .populate("shop", "-user", "-orders", "-ratting")
      .populate("user", "-password", "-isAdmin")
      .sort({ date: -1 });
    res.send(Orders);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Update one Order
router.put("/:id", async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    res.status(404).send({ success: false, error: "No id" });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    res.send(updatedOrder);
  } catch {
    res.status(400).send({ message: err.message });
  }
});

//Create one Order
router.post("/", async (req, res) => {
  const orderItemIds = await Promise.all(
    req.body.orderItems.map(async (orders) => {
      const od = await new OrderItem({
        quantity: orders.quantity,
        item: orders.item,
      });
      const newOd = await od.save();
      return newOd._id;
    })
  );

  const total = await Promise.all(
    orderItemIds.map(async (orders) => {
      const or = await OrderItem.findById(orders).populate("item", "price");
      return or.item.price * or.quantity;
    })
  );

  const totalPrice = await total.reduce((a, b) => a + b, 0);

  const nOrder = new Order({
    orderItems: orderItemIds,
    coordinates: req.body.coordinates,
    street: req.body.street,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    totalPrice: totalPrice,
    user: req.body.user,
    shop: req.body.shop,
  });

  try {
    const newOrder = await nOrder.save();
    res.status(201).send(newOrder);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//Delete one Order
router.delete("/:id", async (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (i) => {
      if (i) {
        await i.orderItems.map(async (item) => {
          await OrderItem.findByIdAndRemove(item);
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
