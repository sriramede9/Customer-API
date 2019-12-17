var express = require("express");
var app = express();

var logger = require("./logger");

const Joi = require("joi");

//const joi = new Joi();

//middleware
//checks JSON in response body and attach to req.body
app.use(express.json());

app.use(logger);

app.use(function(req, res, next) {
  //another middleware that performs Authentication

  console.log("Authentication ...");
  next();
});

const customers = [
  { id: 1, name: "Sri" },
  { id: 2, name: "Sri Ram" },
  { id: 3, name: "Sri Ede" }
];

//middleware
//(req,res) fun is the middleware in this body

app.get("/", (req, res) => {
  res.send("this is test");
});

app.get("/api/customers", function(req, res) {
  res.send(customers);
});

app.get("/api/customers/:id", function(req, res) {
  const customer = customers.find(c => c.id === parseInt(req.params.id));

  if (!customer)
    return res
      .status(404)
      .send("the customer requested in no longer available");

  res.send(customer);
});

//handle post request

app.post("/api/customers", (req, res) => {
  const result = validate(req);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const customer = {
    id: customers.length + 1,
    name: req.body.name
  };

  //validate the input before you push

  customers.push(customer);

  res.status(200).send(customer);
});

//adding put method

app.put("/api/customers/:id", (req, res) => {
  //look for the course by id
  const customer = customers.find(c => c.id === parseInt(req.params.id));

  //sending status if no such id

  if (!customer) {
    return res
      .status(404)
      .send("the customer requested in no longer available");
  }

  //validate the name
  const result = validate(req);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  //else update name by id

  customer.name = req.body.name;

  //customers[customer.id] = customer;

  res.status(200).send(customer);
});

app.delete("/api/customers/:id", (req, res) => {
  //find by id

  const customer = customers.find(c => c.id === parseInt(req.params.id));

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const customerId = customers.findIndex(customer);

  customers.splice(customerId, 1);
  res.status(200).send(customer);
});

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`listening on port ${port} ...`));

function validate(req) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  return result;
}
