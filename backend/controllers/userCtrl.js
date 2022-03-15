const dbc = require("../db-config");
const db = dbc.getDB();

// SignUp

// Login


// Afficher un utilisateur
exports.getOneUser = (req, res, next) => {
  const { id: userId } = req.params;
  let sql =
    "SELECT * FROM users WHERE user.id =?";
  db.query(sql, [userId], (err, result, fields) => {
    if (err) {
      res.status(404).json({ err });
      return;
    }
  //   delete result[0].user.password;
    res.status(200).json(result);
  });
};

// Modifier un utilisateur

//Supprimer un utilisateur






 

