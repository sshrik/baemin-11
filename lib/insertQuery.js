const fs = require("fs");
const util = require("./util.js");

// table : insert 할 파일 이름
// key : insert 할 key, 만약 insert 할 key 중 동일한 것이 있다면 추가하지 않음. primary key의 역할
// value : insert 할 key 에 대한 값. Object 도 가능.
// keySearch : true면 원래 있는 key에 덮어씌우지 않음.
function insertQuery(table, key, value, keySearch) {
  let fileName = "gen/" + table;  // 해당 위치에 파일을 생성하여 진행.
  return new Promise((res, rej) => {
    // 파일 존재 검사.
    util.checkFileExist(table);

    fs.readFile(fileName, function (err, data) {
      if(err) rej(err);
      else {
        let readData = JSON.parse(data);
        // 만약 동일한 키가 존재하면 reject. 아니라면 파일에 해당 key를 추가해서 작성 후 resolve or reject
        if(keySearch && util.checkSameKeyExist(readData, key)) {
          rej("Same Key Exsist");
        }
        else {
          readData[key] = value;
          fs.writeFileSync(fileName, JSON.stringify(readData), function(err, data) {
            if(err) rej(err);
            else res();
          });
        }
      }
    });
  });
}

// table : insert 할 파일 이름
// key : insert 할 key, 만약 insert 할 key 중 동일한 것이 있다면 추가하지 않음. primary key의 역할
// value : insert 할 key 에 대한 값. Object 도 가능.
function insertAutoKeyQuery(table, value) {
  let fileName = "gen/" + table;  // 해당 위치에 파일을 생성하여 진행.
  // 파일 존재 검사.
  util.checkFileExist(table);

  return new Promise((res, rej) => {
    util.getReadData(table)
    .then((readData) => {
      // 무작위 키를 생성, 만약 있는 키면 다시 생성.
      // TODO : 키를 너무 많이 재생성하는 경우 대책이 필요.
      let randomKey = util.getRandomString();
      while(util.checkSameKeyExist(readData, randomKey)) {
        randomKey = util.getRandomString();
      }

      readData[randomKey] = value;
      
      fs.writeFileSync(fileName, JSON.stringify(readData), function(err, data) {
        if(err) rej(err);
        else res();
      });
    })
    .catch((error) => rej(error));
  });
}

// Usage
/*

insertAutoKeyQuery("dbData.json", "hello?")
.catch(err => console.log(err));

혹은

insertQuery("dbData.json", "1", "hello")
.then(() => {
  res.send(JSON.stringify({
    msg : insert success
  }));
})
.catch((err)=>{
  console.log(err);
});
*/