const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("dotenv/config");
const Category = require("./routes/Category");
const Users = require("./routes/User");
const Order = require("./routes/Order");
const Item = require("./routes/Item");
const Shop = require("./routes/Shop");

//.env
const User = process.env.ADMIN;
const Pass = process.env.PASS;

//Middleware
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
app.use("/uploads", express.static(__dirname + "/uploads"));

//Api
app.use("/Category", Category);
app.use("/User", Users);
app.use("/Order", Order);
app.use("/Item", Item);
app.use("/Shop", Shop);

//main api
app.get("/", (req, res) => {
  res.send("Instant Cloths Server Ap");
});

//Database connection
mongoose
  .connect(
    `mongodb+srv://${User}:${Pass}@cluster0.abewd.mongodb.net/instantCloths?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    const categoryRouter = require("./routes/Category");
    app.use("/shop", categoryRouter);
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
