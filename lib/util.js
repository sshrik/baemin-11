const fs = require("fs");
const dl = require("./defaultLocation.js").defaultLocation;

function checkFileExist(table) {
  let fileName = dl + table;  // 해당 위치에 파일을 생성하여 진행.
  let exist = fs.existsSync(fileName);
  if(!exist) fs.writeFileSync(fileName, JSON.stringify({}));
}

function checkSameKeyExist(readData, key) {
  let dataKeys = Object.getOwnPropertyNames(readData);
  for(let i = 0; i < dataKeys.length; i++) {
    if(key == dataKeys[i]) return true;
  }
  return false;
}

function getReadData(table) {
  let fileName = dl + table;  // 해당 위치에 파일을 생성하여 진행.
  return new Promise((res, rej) => {
    fs.readFile(fileName, function (err, data) {
      if(err) rej(err);
      else {
        let readData = JSON.parse(data);
        res(readData);
      }
    });
  });
}

function getRandomString() {
  let minLength = 10;
  let maxLength = 36 - minLength;
  let length = Math.floor(Math.random() * maxLength) + minLength;
  let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for(let i = 0; i < length; i++) {
    result += charSet[Math.floor(Math.random() * charSet.length)];
  }
  return result;
}

module.exports = {
  checkFileExist: checkFileExist,
  checkSameKeyExist: checkSameKeyExist,
  getReadData: getReadData,
  getRandomString: getRandomString
}