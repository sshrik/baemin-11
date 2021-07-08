const insertQuery = require("./insertQuery.js");
const selectQuery = require("./selectQuery.js");
const deleteQuery = require("./deleteQuery.js");

// table : 사용할 파일 명
// checkFunction : 해당 item을 입력으로 받아 true이면 해당 item을 삭제하는 함수.
function deleteAll(table, checkFunction) {
  return new Promise((res, rej) => {
    selectQuery.selectQuery(table, checkFunction)
    .then((data) => {
      let readData = data.readData;
      let resultSet = data.resultSet;

      deleteQuery.deleteManyProcess(table, readData, resultSet)
      .then(()=> res())
      .catch((err)=> rej(err));
    });
  });
}

// table : 사용할 파일 명
// value : 입력할 값
/* option : {
  key : 사용할 primary key 값.
  checkKey : 중복된 key 값일때 value를 update 시킬것인지. true 면 update시키지 않음.
  autoKey : true / false, true면 위의 인자들을 보지 않고 바로 입력.
  }
*/
function insert(table, value, option) {
  return new Promise((res, rej) => {
    if(option.autoKey) {
      insertQuery.insertAutoKeyQuery(table, value)
      .then(()=> res())
      .catch((err) => rej(err));
    }
    else {
      insertQuery.insertQuery(table, option.key, value, option.checkKey)
      .then(()=> res())
      .catch((err) => rej(err));
    }
  });
}

// table : 사용할 파일 명
// checkFunction : 해당 item을 입력으로 받아 true / false를 return 하는 함수
// resolve 형태 : 검색되는게 있다면 true를 return, 없다면 false 를 return
function checkDuplicateValue(table, checkFunction) {
  return new Promise((res, rej) => {
    selectQuery.selectQuery(table, checkFunction)
    .then((data) => {
      res(data.resultSet.length !== 0);
    })
    .catch((err) => rej(err));
  });
}


// Usage
/* 

deleteAll("dbData.json", (item) => {
  if(item === "hello?") return true;
  else return false;
});

insert("dbData.json", "무작위 문자열!", {
  autoKey: false,
  key: "12311",
  checkKey: true
})
.catch((err) => console.log(err));

checkDuplicateValue("dbData.json", (item) => {
  if(item === "우하하하s") return true;
  else return false;
})
.then((result) => console.log(result))
.catch((err) => console.log(err));

*/

module.exports = {
  delete: deleteAll,
  insert: insert,
  select: selectQuery.selectQuery,
  checkDuplicate: checkDuplicateValue
}