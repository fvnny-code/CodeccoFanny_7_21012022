const dbc = require("../database/db-config");

const jwt = require ("jsonwebtoken");
// const postManager = require("../Managers/PostManager")

// POSTS

// afficher tous les posts
exports.getAllPosts = (req, res, next) => {
  // postManager.getAllPosts()
  //   .then((response) => {
  //     res.status(200).json(JSON.stringify(response));
  //   });
  let sql = "SELECT * FROM posts ORDER BY date_creation DESC";
  let query = dbc.query (sql, (err, result)=>{
    if(err){
      throw err
    }
  res.status(200).json (result)
  })
};
// afficher un post 
exports.getOnePost = (req, res, next)=>{
  console.log("getOnePost");
  console.log(req.params.id)
  let sql = "select * from posts where id = ?";
  dbc.query(sql, [req.params.id], (err, result, fields) => {
    if (err) {
      console.log(err)
    }
    res.status(200).json(result)
  })
}
// Créer un post
exports.createPost = (req, res, next) => {
  // let userId = req.body.userId;
  // let title = req.body.title;
  // let content = req.body.content;
  // let sqlInserts = [userId, title, content];
  // postManager
  //   .createPost(sqlInserts)
  //   .then((response) => {
  //     res.status(200).json(JSON.stringify(response));
  //   })
  //   .catch((error) => {
  //     res.status(400).json({ error });
  //   });
let sql = "INSERT INTO posts (userId, title, content, image_url) VALUES(?, ?, ?, ?)";
// console.log("AAAAAAAAAAAAAAAAA =>", req.body);
dbc.query(sql, [req.body.userId, req.body.title, req.body.content, req.body.image_url], (err, results, fields)=>{
  if (err){
    console.log(err)
  }
  res.status(200).json (results)
})

};

// modifier un post
exports.updatePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  let title =  req.body.title;
  let content = req.body.content;
  let postId = req.params.id;
  let sqlInserts1 = [postId];
  let sqlInserts2 = [title, content, postId, userId];
  // postManager.updatePost(sqlInserts1, sqlInserts2)
  // .then((response)=>{
  //   res.status(201).json(JSON.stringify(response));
  // })
  // .catch((error)=>{
  //   res.status(400).json(JSON.stringify(error));
  // })

};

// supprimer un post
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  let postId = req.params.id;
  let sqlInserts1 = [postId];
  let sqlInserts2 = [postId, userId];
  postManager.deletePost(sqlInserts1, sqlInserts2)
  .then((response)=>{
    res.status(200).json(JSON.stringify(response));
  })
  .catch((error)=>{
    res.status(400).json(JSON.stringify(error));
  })
};

// COMMENTS

//Afficher tous les commentaires

// Créer un commentaire

// MOdifier un commentaire

// Supprimer un commentaire

// Supprimer un commentaire avec un post

// LIKES
