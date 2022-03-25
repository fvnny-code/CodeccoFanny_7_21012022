const mysql = require("mysql");
const dbc = require("../database/db-config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp
exports.signup = (req, res, next) => {
  // const hashPassword = bcrypt.hash(req.body.password, 10);
  // const user = { ...req.body, hashPassword };

  let sql1 = "SELECT * FROM users WHERE users.email = ?";
  dbc.query(sql1, [req.body.email], (err, result, fields) => {
    if (result.length > 0) {
      res.status(401).json({ message: "utilisateur déjà existant" });
      return;
    } else {
      let sql2 =
        "INSERT INTO users (users.userName, users.email, users.password, users.avatar) VALUES (?, ?, ?, ?)";
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
            res.status(201).json({ message: "utilisateur créé" });
          }
        }
      );
    }
  });
};

// Login
exports.login = (req, res, next) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  dbc.query(sql, [req.body.email], (err, results, fields) => {
    if (results.length === 0) {
      return res.status(403).json({ message: "utilisateur non trouvé." });
    } else {
      res.status(201).json({ message: "Vous êtes connecté.e" });
    }
    // const user = result [0]
    // bcrypt.compare(req.body.password, user.password)
    // .then(valid =>{
    //   if(!valid){
    //     return res.status(403).json({message:"mot de passe incorrect"})
    //   }
    //   res.status(200).json({
    //     userId: user.id,
    //     userName: user.userName,
    //     email : user.email,
    //     avatar: user.avatar,
    //     isAdmin: user.isAdmin,
    //     token: jwt.sign({userId: user.id}, 'RANDOM_TOKEN_SECRET',{expiresIn: '24h'})
    //   })
    // })
    // .catch( error => res.status(500).json({message:"Utilisateur inconnu."}))
  });
};

// Afficher un utilisateur
exports.getMyProfile = (req, res, next) => {
  let sql = "SELECT * FROM users WHERE id= ?";
  dbc.query(sql, [req.params.id], (err, result, fields)=> {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};

// Modifier un utilisateur
exports.updateUser = (req, res, next) => {
  let sql1 = "SELECT * FROM users WHERE id =?";
  dbc.query(sql1, [req.params.id], (err, result, fields)=>{
    if (err) {
      return res.status(400).json(err);
    }
  });
  const updatedUser = req.body;
  let sql2 =
    "UPDATE users SET ? WHERE id= ?";
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
  dbc.query(sql1, [req.params.id], (error, result, fields)=>{
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
};


