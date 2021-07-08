const express = require('express');
const ssw = require('../middlewares/session.js');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  ssw.sessionWork(req, res, "Main", ["Main", "Login", "Agreement", "InputEmail", "InputPhone"]);
  res.render('screens/Main');
});

module.exports = router;
