const dbc = require("../database/db-config");
// const db = dbc.getDB();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

// Afficher tous les posts
exports.getAllPosts = (req, res, next)=>{
 const token = req.headers.authorization.split(' ')[1];
 const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
 const isAdmin = decodedToken.moderation;
 if(isAdmin == 1){
  
 }
}


// Afficher tous les utilisateurs
// exports.getAllUsers = (req, res, next) => {
//     let sql =
//       "SELECT * FROM users";
//     db.query(sql, (err, result) => {
//       if (err) {
//         res.status(404).json({ err });
//        return;
//       }
//       res.status(200).json(result);
//     });
//   };

  // Supprimer un post

  // Afficher tous les commentaires

  // Suprimer un commentaire