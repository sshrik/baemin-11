const uuid = require("uuid");

function sessionWork(req, res, setTo, available) {
  console.log(req.session);
  console.log(req.cookies);
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
  // console.log(req.session);
}

module.exports = {
  sessionWork: sessionWork,
  sessionLogin: sessionLogin
}