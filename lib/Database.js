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
  updateAvilable : 중복된 key 값일때 value를 update 시킬것인지.
  autoKey : true / false, true면 위의 인자들을 보지 않고 바로 입력.
  }
*/
function insert(table, value, option) {

}

// table : 사용할 파일 명
// value : 중복인지 확인 할 값
// checkFunction : 해당 item을 입력으로 받아 value와 비교해서 동일하면 true를 return 하는 함수
function checkDuplicateValue(table, value, checkFunction) {

}


// Usage
/* 
deleteAll("dbData.json", (item) => {
  if(item === "hello?") return true;
  else return false;
});

*/