require("dotenv/config");

const Express = require("express");
const mongoose = require("mongoose");
const app = Express();

//.env
const User = process.env.ADMIN;
const Pass = process.env.PASS;

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
    const categoryRouter = require("./routes/category");
    app.use("/shop", categoryRouter);
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
