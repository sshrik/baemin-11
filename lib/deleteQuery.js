const fs = require("fs");
const util = require("./util.js");

// table : delete 할 파일 이름
// key : delete 할 key, 만약 insert 할 key 중 동일한 것이 있다면 추가하지 않음. primary key의 역할
function deleteQuery(table, key) {
  let fileName = "gen/" + table;  // 해당 위치에 파일을 생성하여 진행.
  return new Promise((res, rej) => {
    fs.readFile(fileName, function (err, data) {
      if(err) rej(err);
      else {
        let readData = JSON.parse(data);
        // 만약 동일한 키가 존재하면 reject. 아니라면 파일에 해당 key를 추가해서 작성 후 resolve or reject
        if(!util.checkSameKeyExist(readData, key)) {
          rej("Same Key Not Exsist");
        }
        else {
          delete readData[key];
          fs.writeFileSync(fileName, JSON.stringify(readData), function(err, data) {
            if(err) rej(err);
            else res();
          });
        }
      }
    });
  });
}

// Usage

deleteQuery("dbData.json", "1")
.catch(err => console.log(err));
