function log(req, res, next) {
  //req.path
  //now my middleware is logging all the request coming to port 3300

  console.log("Logging..." + req.path);

  //if we do not include next it will be hanging as the middleware is pipeline
  next();
}

module.exports = log;
