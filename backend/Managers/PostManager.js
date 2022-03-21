const dbc = require("../db-config");
const db = dbc.getDB();

const mysql = require("mysql");
// const { getAllPosts } = require("../controllers/postCtrl");
// const { resolve } = require("path");
// const { rejects } = require("assert");

class PostManager {
  constructor() {
    console.log("je suis SuperContructor du PostManager !");
  }

  // POSTS

  getAllPosts() {
    let sql =
    //   "SELECT posts.id, posts.userId, posts.title, posts.content, posts.date_creation, users.id FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date_creation DESC";
    "SELECT * FROM posts ORDER BY date_creation DESC";

    return new Promise((resolve) => {
      dbc.query(sql, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  createPost(sqlInserts) {
    let sql = "INSERT INTO posts VALUES(?, ?, ?, ?, NULL, NOW())";
    sql = mysql.format(sql, sqlInserts);
    return new Promise((resolve) => {
      dbc.query(sql, function (err, result, fields) {
        if (err) throw err;
        resolve({ message: " Nouveau post créé" });
      });
    });
  }
  updatePost(sqlInserts1, sqlInserts2) {
    let sql1 = "SELECT * FROM posts WHERE id = ?";
    sql1 = mysql.format(sql, sqlInserts1);
    return new Promise((resolve) => {
      dbc.query(sql1, function (err, result, fields) {
        if (err) throw err;
        if (sqlInserts2[2] == result[0].userId) {
          let sql2 =
            "UPDATE posts SET title = ?, content = ? WHERE id = ? AND userId = ?";
          sql2 = mysql.format(sql2, sqlInserts2);
          dbc.query(sql2, function (err, result, fields) {
            if (err) throw err;
            resolve({ message: "Post modifié" });
          });
        } else {
          reject({ error: "Fonction indisponible" });
        }
      });
    });
  }
deletePost(sqlInserts1, sqlInserts2){
    let sql1 = "SELECT * FROM posts where id = ?";
    sql1 = mysql.format(sql, sqlInserts1);
    return new Promise((resolve, reject)=>{
        dbc.query(sql1, function(err, result, fields){
            if(err) throw err;
            if(sqlInserts2[1]== result[0].userId){
                let sql2 = "DELETE FROM posts WHERE id = ? AND userId = ?";
                sql2 = mysql.format(sql2, sqlInserts2);
                dbc.query(sql2, function(err, result, fields){
                    if(err) throw err;
                    resolve({message: "Post supprimé"});
                })
            } else {
                reject({error: "Fonction indisponible"});
            }
        });
    })
}


}
