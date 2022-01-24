const mysql = require('mysql');

// création d'une connexion à la DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '27@Pipite12',
    database: 'Groupomania'
});

db.connect(function(err){
    if(err) throw err;
    console.log("Connecté à la base de données MySQL");
})
module.exports.getDB =() =>{
    return db
}