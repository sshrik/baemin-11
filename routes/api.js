const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.js");
const ssw = require('../middlewares/session.js');

function sendData(response, result, resTF) {
  if(resTF) {
    response.statusCode = 200;
  }
  else {
    response.statusCode = 400;
  }
  response.send(JSON.stringify(result));
}

router.post('/signUp', function(req, res, next) {
  const id = req.body.id;
  const pw = req.body.pw;

  auth.addTo(id, pw, (result, resTF) => {
    sendData(res, result, resTF) 
  });
});


router.post('/logIn', function(req, res, next) {
  const id = req.body.email;
  const pw = req.body.loginPassword;
  console.log(id, pw);
  auth.logIn(id, pw, (result, resTF) => {
    if(!result.result) {
      res.redirect("/login?email=" + id);
    }
    else{ 
      ssw.sessionLogin(req, id);
      console.log(req.session);
      res.redirect("/");
    }
  });
});

router.post('/checkDup', function(req, res, next) {
  const id = req.body.id;
  auth.checkDuplicate(id, (result, resTF) => {
    sendData(res, result, resTF) 
  });
});

router.get('/reqAuth', function(req, res, next) {
  const randomNumber = ssw.setRandomNumber(req);

  sendData(res, {auth: randomNumber}, true);
});

router.post('/auth', function(req, res, next) {
  const authKey = req.body.authKey;
  ssw.authNumbering(req, authKey, (result, resTF) => {
    sendData(res, result, resTF) 
  });
});

module.exports = router;
