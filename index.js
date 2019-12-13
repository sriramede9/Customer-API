var express = require("express");
var app = express();

const customers = [
  { id: 1, name: "Sri" },
  { id: 2, name: "Sri Ram" },
  { id: 3, name: "Sri Ede" }
];

app.get("/", (req, res) => {
  res.send("this is test");
});

app.get("/api/customers", function(req, res) {
  res.send(customers);
});

app.get("/api/customer/:id", function(req, res) {
  const customer = customers.find(c => c.id === parseInt(req.params.id));

  if (!customer) {
    res.status(404).send("the customer requested in no longer available");
  }

  res.send(customer);
});

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`listening on port ${port} ...`));
