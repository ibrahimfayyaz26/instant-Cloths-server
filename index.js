var Express = require("express"); //old syntax
const app = Express();

app.get("/123", (req, res) => {
  res.send("it worked");
});

app.listen(100, () => {
  console.log("app listening on port 3000");
});
