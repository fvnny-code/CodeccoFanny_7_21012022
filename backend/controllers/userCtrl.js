const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const mysql = require("mysql");

const dbc = require("../db-config");
// const db = dbc.getDB();
const UserManager = require("../sqlManagers/UserManager");



// SignUp
exports.signup = (req, res, next) => {
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      let sqlInserts = [userName, email, hash];
      UserManager.signup(sqlInserts)
        .then((response) => {
          res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
          console.error(error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(500).json(error));
};
// Login


// Afficher un utilisateur
// exports.getOneUser = (req, res, next) => {
//   const { id: userId } = req.params;
//   let sql =
//     "SELECT * FROM users WHERE user.id =?";
//   db.query(sql, [userId], (err, result, fields) => {
//     if (err) {
//       res.status(404).json({ err });
//       return;
//     }
//   //   delete result[0].user.password;
//     res.status(200).json(result);
//   });
// };

// Modifier un utilisateur

//Supprimer un utilisateur
