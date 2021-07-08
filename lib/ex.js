const db = require("./Database.js");

db.delete("dbData.json", (item) => {
  return item === "heos";
})
.catch((err) => console.log(err));