const dbc = require("../db-config");
const db = dbc.getDB();

// POSTS

// afficher tous les posts
exports.getAllPosts = (req, res, next) => {
  let sql =
    "SELECT * FROM posts ORDER BY date_creation DESC";
  db.query(sql, (err, result) => {
    if (err) {
      // throw err // Erreur à traiter par la suite.
      res.status(500).json(err);
      return;
    }
    res.status(200).json(result);
    // console.log("Dans la query : apres le result");
  });
};

// Afficher un post
exports.getOnePost = (req, res, next) => {
  const { id: postId } = req.params;
  let sql = `SELECT * FROM posts AS p WHERE p.id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ err });
      return;
    }
    res.status(200).json(result);
  });
};

// supprimer un post
exports.deleteOnePost = (req, res, next) => {
  const { id: postId } = req.params;
  let sql = `DELETE FROM posts AS p WHERE p.id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    res.status(200).json(result);
  });
};

// modifier un post
exports.updatePost = (req, res, next) => {
  let sql = "SELECT * FROM posts ORDER BY date_creation DESC";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    console.log(result);
    res.status(200).json(result);
  });
};


// COMMENTS

//Afficher tous les commentaires


// Créer un commentaire

// MOdifier un commentaire

// Supprimer un commentaire


// Supprimer un commentaire avec un post


// LIKES