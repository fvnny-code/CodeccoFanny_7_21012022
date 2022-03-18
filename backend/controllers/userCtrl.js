const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mysql = require("mysql");

const dbc = require("../db-config");
// const db = dbc.getDB();
const UserManager = require("../Managers/UserManager");

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
exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let sqlInserts = [email];
  UserManager.login(sqlInserts, password)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

// Afficher un utilisateur
exports.getOneUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  let sqlInserts = [userId];
  UserManager.getOneUser(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

// Modifier un utilisateur
exports.updateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  let userName = req.body.userName;
  let email = req.body.email;
  let sqlInserts = [userName, email, userId];
  UserManager.updateUser(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

//Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  let sqlInserts = [userId];
  UserManager.updateUser(sqlInserts)
    .then((response) => {
      res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
