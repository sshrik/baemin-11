const db = require("../lib/Database.js");

const userDB = "userInfor.json";

function errorHandler(nowRun, next) {
  try{
    nowRun();
  }
  catch(err) {
    next({
      result: "fail",
      msg: "Internal Server Error"
    }, false);
  }
}

function addTo(id, pw, next) {
  errorHandler(() => {
    db.checkDuplicate(userDB, (item) => {
      return item.id === id;
    })
    .then((isDuplicate) => {
      if(isDuplicate) {
        next({
          result: "fail",
          msg: "이미 존재하는 ID입니다."
        }, false);
      }
      else {
        db.insert(
          userDB, {
          id: id, pw: pw}, 
          {autoKey: true}
        )
        .then(() => {
          next({
            result: "sucess",
            msg: "회원가입 성공!"
          }, true);
        });
      }
    })
  }, next);
}

function checkDuplicate(id, next) {
  errorHandler(() => {
    db.checkDuplicate(userDB, (item) => {
      return item.id === id;
    })
    .then((isDuplicate) => {
      if(isDuplicate) {
        next({
          result: false,
          msg: "이미 존재하는 ID입니다."
        }, true);
      }
      else {
        next({
          result: true,
          msg: "존재하지 않는 ID입니다."
        }, true);
      }
    })
  },next);
}

module.exports = {
  addTo: addTo,
  checkDuplicate: checkDuplicate
}