const dbc = require("../db-config");
const db = dbc.getDB();



// Afficher tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    let sql =
      "SELECT * FROM user";
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
       return;
      }
      res.status(200).json(result);
    });
  };

  // Supprimer un post

  // Afficher tous les commentaires

  // Suprimer un commentaire