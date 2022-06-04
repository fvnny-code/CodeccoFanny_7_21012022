const mysql = require('mysql');
const util = require('util');

// configuration de la connexion à la DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    // password: '',
    database: 'groupomania2',
     port : 8889
    //port: 3306,
});

db.pQuery = util.promisify(db.query)


// connexion à la DB
// module.exports.getDB =function(){
//   return db
// }
module.exports = db;

  // déconnexion à la DB
  // module.exports.closeDB =function(){
  //   db.end();
  // }

