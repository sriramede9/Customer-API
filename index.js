var express = require("express");
var app = express();

var logger = require("./middleware/logger");

const Joi = require("joi");

const morgan = require("morgan");

const appDebug = require("debug")("app:generalLogging");
const dbDebug = require("debug")("app:dbLogging");

//getting route for customers

const customers = require("./routes/customers");

//getting route for home page

const home = require("./Home/home");

//const joi = new Joi();

//middleware
//checks JSON in response body and attach to req.body
app.use(express.json());

app.use(logger);

app.set("view engine", "pug");
app.set("views", "./views");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //console.log("we are in dev mode morgan is enabled");
  appDebug("we are in dev mode morgan is enabled");
  dbDebug("we are in dev mode morgan is enabled logged by db debug");
}

//adding few more middleware functions

//accepts key value pairs in post method
app.use(express.urlencoded({ extended: true }));

//we can access static files as well

app.use(express.static("demo"));

app.use(function(req, res, next) {
  //another middleware that performs Authentication

  console.log("Authentication ...");
  next();
});

//using customers route

app.use("/api/customers", customers);

//using home route

app.use("/", home);

//middleware
//(req,res) fun is the middleware in this body

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`listening on port ${port} ...`));
