// Import of jsonWebToken package
const jwt = require("jsonwebtoken");
// DB connection
const dbc = require("../database/db-config");;

// mysql
const mysql = require('mysql');

// Routes control : checks the user's TOKEN. If it matches the userID in the request, changing the corresponding data will be allowed
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    let sql = 'SELECT COUNT(id) FROM user WHERE id=?';
    sql= mysql.format(sql, sqlInserts);
    dbc.query(sql, function(err, result){
        if(err) reject({error: "Erreur dans l'inscription"});
        if(result[0]['COUNT(id)'] !== 1){
            throw 'Token invalide';
        } else {
            next();
        }
    })
  } catch(error) {
    res.status(401).json({ error: new Error("Votre requête est invalide") });
  }
};

