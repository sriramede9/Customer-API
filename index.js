var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.send("this is test");
});

app.get("/api/customers", function(req, res) {
  res.send([1, 2, 3]);
});

app.get("/customer/:id", function(req, res) {
  res.send("Customer " + req.params.id);
});

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`listening on port ${port} ...`));
