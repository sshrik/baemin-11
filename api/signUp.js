const db = require("../model/db.js");

function isDuplicateID(id) {
    if(db.selectID(id) !== 0) {
        return true;
    }
    else {
        return false;
    }
}
