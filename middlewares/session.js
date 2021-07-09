const session = require("express-session");
const uuid = require("uuid");

function sessionWork(req, res, setTo, available) {
  let sid = uuid.v4();
  let result = false;

  if(!req.cookies["bm-cookie"]) {
      // Cookie 없다면 cookie 처리
      res.append('Set-Cookie', `bm-cookie=${sid}`);
      result = true;
  }
  else {
    // Cookie 가 있다면 sid로 해당 cookie 사용.
    sid = req.cookies["bm-cookie"];
  }
  if(!req.session[sid]) {
      result = true;
  }
  if(!available.includes(req.session[sid])) {
    result = true;
  }

  // 어디까지 진행됐는지 확인하기
  req.session[sid] = setTo;
  return result;
}

function sessionLogin(req, id) {
  if(!req.session.user) {
    req.session.user = {};
  }
  req.session.user[id] = true;
}

function setRandomNumber(req) {
  const randomNumber = genRandomNumber();
  console.log(req.cookies);
  if(!req.session.auth) {
    req.session.auth = {};
  }

  req.session.auth[req.cookies["bm-cookie"]] = {
    auth: randomNumber,
    timer: Date.now()
  };

  return randomNumber;
}

function authNumbering(req, authKey, next) {
  const authInfor = req.session.auth[req.session["bm-cookie"]];

  if(authInfor.auth === authKey) {
    if(Date.now() - authInfor.timer < 30 * 1000) { 
      delete req.session.auth[req.session["bm-cookie"]];
      next({
        result: "success",
        msg: "Authenticate success!"
      }, true);
    }
    else {
      next({
        result: "fail",
        msg: "Authenticate Fail - timeout"
      }, false);
    }
  }
  else {
    next({
      result: "fail",
      msg: "Authenticate Fail - key not correct"
    }, false);
  }
}

function genRandomNumber() {
  let randomNumberString = "";

  for(let i = 0; i < 10; i++) {
    randomNumberString += Math.floor(Math.random() * 10).toString();
  }

  return randomNumberString;
}

module.exports = {
  sessionWork: sessionWork,
  sessionLogin: sessionLogin,
  setRandomNumber: setRandomNumber,
  authNumbering: authNumbering
}