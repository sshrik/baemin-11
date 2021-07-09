const express = require('express');
const ssw = require('../middlewares/session.js');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(ssw.sessionWork(req, res, "Agreement", ["Login", "InputPhone"])) {
      res.redirect("/");
  }
  else {
      res.render("screens/Agreement");
  }
});

module.exports = router;
