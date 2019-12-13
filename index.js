var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.send("this is test");
});

app.listen(3300);
