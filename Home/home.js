var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "User API Express",
    message: "will give User with rest methods"
  });
  res.send("this is test");
});

module.exports = router;
