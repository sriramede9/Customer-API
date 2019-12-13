var express = require("express");
var app = express();

const Joi = require("joi");

//const joi = new Joi();

app.use(express.json());

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

//handle post request

app.post("/api/customers", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const customer = {
    id: customers.length + 1,
    name: req.body.name
  };

  //validate the input before you push

  customers.push(customer);

  res.status(200).send(customer);
});

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`listening on port ${port} ...`));
