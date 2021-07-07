function checkSameKeyExist(readData, key) {
  let dataKeys = Object.getOwnPropertyNames(readData);
  for(let i = 0; i < dataKeys.length; i++) {
    if(key == dataKeys[i]) return true;
  }
  return false;
}

module.exports = {
  checkSameKeyExist: checkSameKeyExist
}