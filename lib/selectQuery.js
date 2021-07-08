const fs = require("fs");
const util = require("./util.js");

// table : select 할 파일 이름
// checkFunction : select 할 조건, value애서 해당 조건이 맞는 것을 찾아냄.
// resolve({readData, resultKey}) : resolve 형태, object를 return
//    - readData : table object. 이후 더 읽는 동작을 진행하지 않기 위해 deleteProcess 등에서 사용 가능하다.
//    - resultKey : result 값, checkFunction의 결과가 true인 key값을 모아 resolve에 전달.
function selectQuery(table, checkFunction) {
  let fileName = "gen/" + table;  // 해당 위치에 파일을 생성하여 진행.
  return new Promise((res, rej) => {
    // 파일 존재 검사.
    util.checkFileExist(table);

    fs.readFile(fileName, function (err, data) {
      if(err) rej(err);
      else {
        // 파일을 읽어 json 형태로 변환.
        let readData = JSON.parse(data);
        let resultSet = [];

        for(let key in readData) {
          if(checkFunction(readData[key])) resultSet.push(key);
        }

        // resolve 함수 실행 ( 읽은 값, 결과 key들 )
        res({ readData, resultSet });
      }
    });
  });
}

// Usage
/*

selectQuery("dbData.json", (item) => {
  // data format이 {"key" : item} 으로 저장되어있다고 가정.
  if(item === "hello") return true;
  else return false;
})
.then((data) => {
  console.log(data.readData, data.resultSet);
})
.catch((err) => {
  console.log(err);
});

*/