const mysql = require('mysql');
const util = require('util');

// configuration de la connexion à la DB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'groupomania2',
  port: 8889

});

db.query = util.promisify(db.query)

module.exports = db;



