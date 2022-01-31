// Import  of Bcrypt package : to hash password
const bcrypt = require("bcrypt");
//Import of jsonWebToken package : to assign a token to a user when login in.
const jwt = require("jsonwebtoken");
// Import of crypto-js : to encrypt email.
const cryptojs = require("crypto-js");
//Import of File System : to manage download an upload images.
const fs = require("fs");
// Import the database connection
const db = require("../models");
const { restart } = require("nodemon");

const User = db.user;

//Middleware for user's account création :
exports.signup = (req, res, next) => {
  const cryptedEmail = cryptojs
    .HmacSHA256(req.body.email, KEY_SECRET)
    .toString();
  User.findOne({ where: { email: cryptedEmail } }).then((user) => {
    if (user) {
      return res.status(404).json({ error: "E-mail déjà utilisé" });
    }
  });
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = {
        username: req.body.username,
        email: cryptedEmail,
        password: hash,
        admin: 0,
      };
      User.create(newUser)
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Middleware to log a user already created in the DB
exports.login = (req, res, next) => {
  const cryptedEmail = cryptojs
    .HmacSHA256(req.body.email, KEY_SECRET)
    .toString();
  User.findOne({ where: { email: cryptedEmail } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: " utilisateur inconnu" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: " Mot de passe non valide" });
          }
          res.status(200).json({
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
            admin: user.admin,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expirexIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Middleware to delete a user account
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.avatar != null) {
        const filename = user.avatar.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          User.destroy({ where: { id: req.params.id } })
            .then(() =>
              res
                .status(200)
                .json({ message: "Le compte Utilisateur a été supprimé." })
            )
            .catch((error) => {
              res.status(404).json({ error });
            });
        });
      } else {
        User.deleteOne({ where: { id: req.params.id } });
        res
          .status(200)
          .json({ message: "Le compte utilisateur a été supprimé." });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Middleware to modify a user account
exports.modifyUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.avatar !== null) {
        let img = user.avatar.split("/images/")[1];
        fs.unlink("images/" + img, () => {
          User.update(
            {
              avatar:
                req.protocol +
                "://" +
                req.get("host") +
                "/images/" +
                req.file.filename,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              res.status(201).json({ message: "Avatar mis à jour" });
            })
            .catch((error) => {
              res.status(404).json({ error });
            });
        });
      } else {
        User.update(
          {
            avatar:
              req.protocol +
              "://" +
              req.get("host") +
              "/images/" +
              req.file.filename,
          },
          { where: { id: req.params.id } }
        );
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Middleware to get a user account by its ID
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } });
  then((user) => {
    res.status(200).json(user);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

// Middleware to get the list of all users accounts
exports.getAllUsers = (req, res, next) => {
  console.log(req);
  User.findAll({ attributes: ["id", "username", "avatar"] })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
