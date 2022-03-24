const mysql = require('mysql');

// configuration de la connexion à la DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    database : 'groupomania2',
    port : 8889
  });
  
  // connexion à la DB
  // module.exports.getDB =function(){
  //   return db
  // }
  module.exports = db;

  // déconnexion à la DB
  // module.exports.closeDB =function(){
  //   db.end();
  // }