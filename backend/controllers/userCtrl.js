const mysql = require("mysql");
const dbc = require("../database/db-config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp
exports.signup = (req, res, next) => {
  const user = req.body;
  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      // let sql1 = "SELECT * FROM users WHERE users.email = ?";
      // dbc.query(sql1, [req.body.email], (err, result, fields) => {
      //   if (result.length > 0) {
      //     res.status(401).json({ message: "utilisateur déjà existant" });
      //     return;
      //   } else {
          let sql2 =
            "INSERT INTO users SET ?";
          dbc.query(
            sql2,
            [
              req.body.userName,
              req.body.email,
              req.body.password,
              req.body.avatar,
              req.body.isAdmin,
            ],
            (err, results, fields) => {
              if (!results) {
                res.status(400).json({ message: "email déjà utilisé" });
              } else {
                res
                  .status(201)
                  .json({
                    message:
                      "utilisateur créé. Vous pouvez maintenant vous connecter.",
                  });
              }
            }
          );
        // }
      })
    .catch((error) => res.status(500).json(error));
};

// Login
exports.login = (req, res, next) => {
  const userReq = req.body.userName;
  const passReq = req.body.password;
  if (userReq && passReq) {
    const sql = "SELECT * FROM users WHERE email = ?";
    dbc.query(sql, userReq, (err, results, fields) => {
      if (results.length > 0) {
        bcrypt.compare(passReq, results[0].password).then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "mot de passe incorrect." });
          } else {
            res.status(200).json({
              userId:  results[0].id,
              userName: results[0].userName,
              email:  results[0].email,
              avatar:  results[0].avatar,
              isAdmin: results[0].isAdmin,
              token: jwt.sign({ userId: results[0].id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }
              )
            })
            // res.status(201).json({ message: "Vous êtes connecté.e" });
            console.log(userReq, "est connecté.e.");
          }
        });
      }
      // const user = result[0];
      // // bcrypt
      //   .compare(req.body.password, user.password)
      //   .then((valid) => {
      //     if (!valid) {
      //       return res.status(403).json({ message: "mot de passe incorrect" });
      //     }
         
        })
        .catch((error) =>
          res.status(500).json({ message: "Utilisateur inconnu." })
        );
    };
}
// Afficher un utilisateur
exports.getMyProfile = (req, res, next) => {
  let sql = "SELECT * FROM users WHERE id= ?";
  dbc.query(sql, [req.params.id], (err, result, fields) => {
    if (err) {
      // return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

// Modifier un utilisateur
exports.updateUser = (req, res, next) => {
  let sql1 = "SELECT * FROM users WHERE id =?";
  dbc.query(sql1, [req.params.id], (err, result, fields) => {
    if (err) {
      return res.status(400).json(err);
    }
  });
  const updatedUser = req.body;
  let sql2 = "UPDATE users SET ? WHERE id= ?";
  dbc.query(sql2, [updatedUser, req.params.id], (err, result, fields) => {
    if (err) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ message: "Le profil a bien été modifié !" });
  });
};

//Supprimer un compte utilisateur quand on est utilisateur
exports.deleteUser = (req, res, next) => {
  let sql1 = "SELECT * FROM users WHERE id = ?";
  dbc.query(sql1, [req.params.id], (error, result, fields) => {
    if (error) {
      return res.status(400).json(error);
    }
  });
  let sql2 = "DELETE FROM users WHERE id = ?";
  dbc.query(sql2, [req.params.id], (err, result, fields) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.status(200).json({ message: "Compte utilisateur supprimé." });
  });
}
