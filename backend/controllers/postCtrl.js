const dbc = require("../database/db-config");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

// POSTS

// afficher tous les posts
exports.getAllPosts = (req, res, next) => {
  let sql = "SELECT * FROM posts ORDER BY date_creation DESC";
  dbc.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};
// afficher un post
exports.getOnePost = (req, res, next) => {
  // console.log("getOnePost");
  // console.log(req.params.id)
  let sql = "SELECT * FROM posts WHERE id = ?";
  dbc.query(sql, [req.params.id], (err, result, fields) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};
// Créer un post
exports.createPost = (req, res, next) => {
  let sql =
    "INSERT INTO posts (userId, title, content, image_url) VALUES(?, ?, ?, ?)";
  // console.log("AAAAAAAAAAAAAAAAA =>", req.body);
  dbc.query(
    sql,
    [req.body.userId, req.body.title, req.body.content, req.body.image_url],
    (err, results, fields) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(results);
    }
  );
};
// modifier un post
exports.updatePost = (req, res, next) => {
  // const token = req.headers.authorization.split(' ')[1];
  // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  // const userId = decodedToken.userId;
  // let title =  req.body.title;
  // let content = req.body.content;
  // let postId = req.params.id;
  // let sqlInserts1 = [postId];
  // let sqlInserts2 = [title, content, postId, userId];
  let sql1 = "SELECT * FROM posts WHERE id = ?";
  dbc.query(sql1, [req.params.id], (err, results, fields) => {
    if (err) {
      return res.status(400).json(err);
    }
  });
  const updatedPost = req.body;
  let sql2 = "UPDATE posts SET ? WHERE id = ?";
  dbc.query(sql2, [updatedPost, req.params.id], (err, results, fields) => {
    if (err) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ message: "Le post a bien été modifié !" });
  });
};
// supprimer un post
exports.deletePost = (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];
  // const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  // const userId = decodedToken.userId;
  // let postId = req.params.id;
  // let sqlInserts1 = [postId];
  // let sqlInserts2 = [postId, userId];
  // postManager
  //   .deletePost(sqlInserts1, sqlInserts2)
  //   .then((response) => {
  //     res.status(200).json(JSON.stringify(response));
  //   })
  //   .catch((error) => {
  //     res.status(400).json(JSON.stringify(error));
  //   });
  let sql1 = "SELECT * FROM posts WHERE id = ?"; // récupération du post par son id
  dbc.query(sql1, [req.params.id], (error, results, fields) => {
    if (error) {
      return res.status(400).json(error);
    }
  });
  let sql2 = "DELETE FROM posts WHERE id = ?";
  dbc.query(sql2, [req.params.id], (error, results, fields) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ message: "Le post a bien été supprimé." });
  });
};

// COMMENTS
//Afficher tous les commentaires
exports.getComments = (req, res, next) => {
  let sql =
    "SELECT comments.id, comments.userId,comments.comContent FROM comments JOIN users ON comments.userId = users.id WHERE postId";
  dbc.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(result);
  });
};
// Créer un commentaire
exports.createComment = (req, res, next) => {
  let sql = "INSERT INTO comments (userId, postId, comContent) VALUES(?, ?, ?)";
  dbc.query(
    sql,
    [req.body.userId, req.body.postId, req.body.comContent],
    (err, results, fields) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ message: "commentaire créé." });
    }
  );
};
// Modifier un commentaire
exports.updateComment = (req, res, next) => {
  let sql1 = "SELECT * FROM comments WHERE id = ?";
  dbc.query(sql1, [req.params.id], (err, results, fields) => {
    if (err) {
      return res.status(400).json(err);
    }
  });
  const updatedComment = req.body;
  let sql2 = "UPDATE comments SET comContent = ? WHERE postId = ?";
  dbc.query(sql2, [updatedComment, req.params.id], (err, results, fiedls) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res
      .status(200)
      .json({ message: "Le commentaire a bien été modifié !" });
  });
};
// Supprimer un commentaire
exports.deleteComment = (req, res, next)=>{
  let sql1 ="SELECT * FROM comments WHERE id = ?";
  dbc.query(sql1, [req.params.id], (error, results, fields)=>{
    if (error) {
      return res.status(400).json(error);
    }
  })
  let sql2="DELETE FROM comments WHERE userId = ?";
  dbc.query(sql2, [req.params.id], (error, results, fields)=>{
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ message: "Le commentaire a bien été supprimé." });
  })
}
// Supprimer un commentaire avec un post

// LIKES
