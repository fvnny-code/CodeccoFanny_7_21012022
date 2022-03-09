const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.envDB_PASSWORD,
  database : "Groupomania"
});

module.exports.getDB =()=>{
  return db
}
