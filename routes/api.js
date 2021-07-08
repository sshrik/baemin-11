const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.js");

router.post('/signIn', function(req, res, next) {
  const id = req.body.id;
  const pw = req.body.pw;

  auth.checkDuplicate(id, pw, (result, resTF) => {
    if(resTF) {
      res.statusCode = 200;
    }
    else {
      res.statusCode = 400;
    }
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
