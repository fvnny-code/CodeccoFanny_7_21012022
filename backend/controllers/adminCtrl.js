const dbc = require("../database/db-config");
const mysql = require("mysql");

const jwt = require("jsonwebtoken");


// Afficher tous les posts
exports.getAllPosts = (req, res, next) => {
  // const admin = req.bdy.isAdmin;
  if (admin == 1) {
    let sql = "SELECT * FROM posts ORDER BY date_creation DESC";
    dbc.query(sql, (err, result, fields) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  } else {
    res.status(400).json({ error: "Requête non autorisée" });
  }
};
// Supprimer un post
exports.deletePostByAdmin = (req, res, next) => {
  // const admin = req.bdy.isAdmin;
  if (admin == 1) {
    let sql = "DELETE FROM posts WHERE id = ?";
    dbc.query =
      (sql,
      (err, result, fields) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res
          .status(200)
          .json({ message: "Le post a bien été supprimé." });
      });
  } else {
    res.status(400).json({ error: "Requête non autorisée" });
  }
};
// Afficher tous les commentaires
exports.getAllComments = (req, res, next) => {
  // const admin = req.bdy.isAdmin;
  if (admin == 1) {
    let sql = "SELECT * FROM comments ORDER BY date_creation DESC";
    dbc.query(sql, (err, result, fields) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  } else {
    res.status(400).json({ error: "Requête non autorisée" });
  }
};
// Suprimer un commentaire
exports.deleteCommentByAdmin = (req, res, next) => {
  // const admin = req.bdy.isAdmin;
  if (admin == 1) {
    let sql = "DELETE FROM comments WHERE id = ?";
    dbc.query (sql, (err, result, fields) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res
          .status(200)
          .json({ message: "Le commentaire a bien été supprimé." });
      });
  } else {
    res.status(400).json({ error: "Requête non autorisée" });
  }
};


