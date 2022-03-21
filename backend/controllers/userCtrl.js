const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

const dbc = require("../db-config");
// const db = dbc.getDB();
// const UserManager = require("../Managers/UserManager");

// SignUp
exports.signup = (req, res, next) => {
  // let userName = req.body.userName;
  // let email = req.body.email;
  // let password = req.body.password;
  // bcrypt
  //   .hash(password, 10)
  //   .then((hash) => {
  //     let sqlInserts = [userName, email, hash];
  //     UserManager.signup(sqlInserts)
  //       .then((response) => {
  //         res.status(201).json(JSON.stringify(response));
  //       })
  //       .catch((error) => {
  //         res.status(400).json({ error });
  //       });
  //   })
  //   .catch((error) => res.status(500).json(error));

  const hashPassword = bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, hashPassword };

  let sql = "SELECT * FROM users WHERE users.userName = ?";
  dbc.query(sql, [user.userName], function (err, result, fields) {
    if (result.length > 0) {
      res.status(401).json({ message: "utilisateur déjà existant" });
      return;
    } else {
      let sql =
        "INSERT INTO users (users.userName, users.email, users.password, users.avatar, users.isAdmin, users.date_creation) VALUES (?, ?, ?, ?, ?, ?)";
      dbc.query(
        sql,
        [
          user.userName,
          user.email,
          user.hashPassword,
          user.avatar,
          user.isAdmin,
          user.date_creation,
        ],
        function (err, result, fields) {
          if (!reusult) {
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
  // let email = req.body.email;
  // let password = req.body.password;
  // let sqlInserts = [email];
  // UserManager.login(sqlInserts, password)
  //   .then((response) => {
  //     res.status(200).json(JSON.stringify(response));
  //   })
  //   .catch((error) => {
  //     res.status(400).json(error);
  //   });
let email = req.body.email
const sql = "SELECT * FROM users WHERE email = ?";
dbc.query(sql [email], (err, result)=>{
  if(result.length === 0){
    return res.status(403).json({message:"utilisateur non trouvé."})
  }
  const user = result [0]
  bcrypt.compare(req.body.password, user.password)
  .then(valid =>{
    if(!valid){
      return res.status(403).json({message:"mot de passe incorrect"})
    }
    res.status(200).json({
      userId: user.id,
      userName: user.userName,
      email : user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: jwt.sign({userId: user.id}, 'RANDOM_TOKEN_SECRET',{expiresIn: '24h'})
    })
  })
  .catch( error => res.status(500).json({message:"Utilisateur inconnu."}))
})

};

// Afficher un utilisateur
exports.getOneUser = (req, res, next) => {
  let User = req.params.id
  let sql = "SELECT user.id, user.userName, user.email, user.avatar, user.isAdmin, user.date_creation FROM users WHERE user.id= ?";
  let query = dbc.query(sql, [User], function(err, result, fields){
    if (err){
      throw err
    }
    res.status(200).json(results)
  })
  
};

// Modifier un utilisateur
exports.updateUser = (req, res, next) => {
  const id = req.userId
  const userName =  req.body.userName
  const email = req.body.email
  const avatar = req.body.avatar
  const sql = "UPDATE users SET users.userName = ?, users.email = ?, users.avatar = ? WHERE users.id= ?";
  dbc.query( sql, [userName, email, avatar, id], (err, results)=>{
    if(err){
     return res.status(500).json({err})
    }
    res.status(200).json({message:"compte mis à jour"})
  })
};

//Supprimer un compte utilisateur quand on est utilisateur
exports.deleteUser = (req, res, next) => {
  const userId = req.userId
  const sql = "DELETE FROM users WHERE id = ?";
  dbc.query(sql, userId, (err, results)=>{
    if(err){
      return res.status(404).json({err})
    }
    res.status(200).json({ message: "Compte utilisateur supprimé."})
  })
};
// Supprimer un compte utilisateur quand on est admin
exports.deleteUserByAdmin = (req, res, next)=>{
  const userPost = req.params.id
  const userId = req.userId
  const sql = "SELECT COUNT(id) AS TOTAL FROM users WHERE users.id= ? AND users.isAdmin = 1";
  dbc.query(sql, userId, (err, results)=>{
    if(err){
      return res.status(404).json({err})
    }
    const admin = results[0].TOTAL
    if(admin === 1){
      const sql2 = "DELETE FROM users WHERE id = ?";
      dbc.query(sql2, userPost, (err, results)=>{
        if(err){
          return res.status(404).json({err})
        }
        res.status(200).json({message:"Compte supprimé par le modérateur."})
      })
    } else {
      res.status(401).json({message : "Vous n'êtes pas autorisé à supprimer ce comtpe."})
    } 
  })
}