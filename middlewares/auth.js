const db = require("../lib/Database.js");

const userDB = "userInfor.json";

function checkDuplicate(id, pw, next) {
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
  .catch((err) => {
    next({
      result: "fail",
      msg: "Internal Server Error"
    }, false);
  });
}

module.exports = {
  checkDuplicate:checkDuplicate
}