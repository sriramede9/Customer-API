var express = require("express");
var router = express.Router();

const customers = [
  { id: 1, name: "Sri" },
  { id: 2, name: "Sri Ram" },
  { id: 3, name: "Sri Ede" }
];

router.get("/", function(req, res) {
  res.send(customers);
});

router.get("/:id", function(req, res) {
  const customer = customers.find(c => c.id === parseInt(req.params.id));

  if (!customer)
    return res
      .status(404)
      .send("the customer requested in no longer available");

  res.send(customer);
});

//handle post request

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  //find by id

  const customer = customers.find(c => c.id === parseInt(req.params.id));

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const customerId = customers.findIndex(customer);

  customers.splice(customerId, 1);
  res.status(200).send(customer);
});

function validate(req) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  return result;
}

module.exports = router;
