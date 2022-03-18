const dbc = require("../db-config");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signup } = require("../controllers/userCtrl");
const { resolve } = require("path");

class UserManager {
  constructor() {
    console.log("je suis SuperContructor !");
  }

  // création de compte
  signup(sqlInserts) {
    let sql = "INSERT INTO users VALUES(NULL, ?, ?, ?, NULL, ?)";
    sql = mysql.format(sql, sqlInserts);
    return new Promise((resolve, reject) => {
      dbc.query(sql, function (err, result) {
        if (err) reject({ error: "Erreur dans l'inscription" });
        resolve({ message: "Nouvel utilisateur !" });
      });
    });
  }
  // connexion
  login(sqlInserts, password) {
    let sql = "SELECT * FROM users WHERE email = ?";
    sql = mysql.format(sql, sqlInserts);

    return new Promise((resolve, reject) => {
      dbc.query(sql, function (err, result) {
        if (err) reject({ err });
        if (!result[0]) {
          reject({ error: "utilisateur introuvable " });
        } else {
          bcrypt
            .compare(password, result[0].password)
            .then((valid) => {
              if (!valid) return reject({ error: "Mot de passe incorrect " });
              resolve({
                userId: result[0].id,
                token: jwt.sign(
                  { userId: result[0].id, isAdmin: result[0].isAdmin },
                  "RANDOM_TOKEN_SECRET",
                  { expiresIn: "24h" }
                ),
                isAdmin: result[0].isAdmin,
              });
            })
            .catch((err) => reject({ error }));
        }
      });
    });
  }
  // afficher un utilisateur
  getOneUser(sqlInserts){
    let sql = "SELECT username, email FROM users WHERE id = ?";
    sql = mysql.format(sql, sqlInserts);
    return new Promise ((resolve, reject)=>{
      dbc.query(sql, function(err, result){
        if (err) return reject ({error: "page indisponible"});
        resolve(result);
      })
    })
  }
// modifier un utilisateur
updateUser(sqlInserts){
  let sql = "UPDATE users SET username = ?, email = ? WHERE id= ?";
  sql = mysql.format(sql, sqlInserts);
  return new Promise((resolve, reject)=>{
    dbc.query(sql, function(err, result){
      if(err) return reject ({ error: "Fonction indisponible"});
      resolve({message: "Informations mises à jour"});
    })
  })
}
// supprimer un compte utilisateur
deleteUser(sqlInserts){
  let sql = "DELETE FROM users WHERE id= ?";
  sql = mysql.format(sql, sqlInserts);
  return new Promise((resolve, reject)=>{
    dbc.query(sql, function(err, result){
      if(err) return reject ({ error: "Fonction indisponible"});
      resolve({message: "Compte utilisateur supprimé"});
    })
  })
}


}
module.export = UserManager;
