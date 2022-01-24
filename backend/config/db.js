const mysql = require('mysql');

// création d'une connexion à la DB
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(function(err){
    if(err) throw err;
    console.log("Connecté à la base de données MySQL");
})

module.exports.getDB = ()=> {
    
    return db
}