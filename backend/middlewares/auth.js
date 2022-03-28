// Import of jsonWebToken package
const jwt = require("jsonwebtoken");
// DB connection
const dbc = require("../database/db-config");;

// mysql
const mysql = require('mysql');

// Routes control : checks the user's TOKEN. If it matches the userID in the request, changing the corresponding data will be allowed
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // récupération du token de l'entête
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Vérification du token davec la "clé secrète"
    const userId = decodedToken.userId; // On obtient un objet JS qu'on place dans une constante, et on y récupère l'userId pour comparaison le cas échéant.

    // if(req.body.userId && req.body.userId !== userId){
    //   throw "Identifiant non valable.";
    // } else{
    //   next();
    // }
    let sql ='SELECT COUNT(id) FROM users WHERE id= ?';
    dbc.query(sql, userId, (err, result)=>{
      if (err) reject ({error : "Erreur dans l'inscription"})
      if (result[0]['COUNT(id)']!== 1){
        throw 'Token invalide';
      } else {
        next();
      }
    })


  } catch(error) {
    res.status(401).json({ error:  error | "Requête non authentifiée" });
  }
};

