const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('screens/Main');
});

router.get('/Pad', function(req, res, next) {
  res.render('screens/Pad');
});

module.exports = router;
