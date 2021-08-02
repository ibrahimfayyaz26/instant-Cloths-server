const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const Shop = require("../models/Chat");

app.use(bodyParser.json())

const pusher = new Pusher({
  app_id = "1244104",
  key = "d140d47811bd10da850c",
  secret = "7a83d9f32574b7432eb8",
  cluster = "ap2",
  encrypted: true
})

//set cors middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//handle route post function
app.post("/", function(req, res) {
  pusher.trigger("pubchat", "message_sent", { message : req.body.message, name : "Anonymous" });
  res.send({
    message:"message_sent"
  })
});

module.exports = router;

