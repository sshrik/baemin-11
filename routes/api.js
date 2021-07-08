const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.js");

function sendData(response, result, resTF) {
  if(resTF) {
    response.statusCode = 200;
  }
  else {
    response.statusCode = 400;
  }
  response.send(JSON.stringify(result));
}

router.post('/signIn', function(req, res, next) {
  const id = req.body.id;
  const pw = req.body.pw;

  auth.addTo(id, pw, (result, resTF) => {
    sendData(res, result, resTF) 
  });
});

router.post('/checkDup', function(req, res, next) {
  const id = req.body.id;

  auth.checkDuplicate(id, (result, resTF) => {
    sendData(res, result, resTF) 
  });
});

module.exports = router;
