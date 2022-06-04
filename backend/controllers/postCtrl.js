const dbc = require("../database/db-config");
const jwt = require("jsonwebtoken");
// Import the filesystem module
const fs = require('fs');


// afficher tous les posts
exports.getAllPosts = (req, res, next) => {
    let sql = "SELECT posts.*, users.username, users.avatar FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date_creation DESC";
    dbc.query(sql, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.status(200).json(result);
    });
};

// afficher un post
exports.getOnePost = (req, res, next) => {
    let sql = "SELECT posts.*, users.username, users.avatar FROM posts JOIN users ON posts.userId = users.id WHERE posts.id = ? ";
    dbc.query(sql, [Number(req.params.id)], (err, result, fields) => {
        if (err) {
            return res.status(400).json(err);
        }
        console.log("BBBBBBBB"+ {result})
        console.log(req.params.id)
        // S'il n'y a pas d'erreur, est-ce qu'il y a un résultat ? 
        if (result[0] != undefined) {
            console.log("AAAAAAAAA"+{result})
            // Ca marche, on retourne un résultat. 
            res.status(200).json(result[0]);
        } else {
            // Il n'y a pas d'élément avec cet id, on retourne un 404 sans données. 
            res.status(404).json("");
        }
    });
};

// Créer un post
exports.createPost = async (req, res, next) => {

    let sql = "INSERT INTO posts (userId, title, content, image_url) VALUES (?, ?, ?, ?)";

    console.log("Req.body : ", req.body);
    console.log("Req.file : ", req.file);
    //console.log("Req.image : ", req.image);
    let image_url = null;

    if (typeof req.file != "undefined") {
        //image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        image_url = `${req.file.filename}`
        console.log("image_url", image_url);
    }
    dbc.query(sql, [req.body.userId, req.body.title, req.body.content, image_url], (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        } else {
            res.status(200).json("Post créé !");
            return;
        }
    });
};

// modifier un post
exports.updatePost = (req, res, next) => {
    console.log("Update post demandé !");
    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // const userId = decodedToken.userId;
    // let title =  req.body.title;
    // let content = req.body.content;
    // let postId = req.params.id;
    // let sqlInserts1 = [postId];
    // let sqlInserts2 = [title, content, postId, userId];
    let sql1 = "SELECT * FROM posts WHERE id = ?";
    console.log("id : ", req.params.id);
    dbc.query(sql1, [req.params.id], (err, results, fields) => {
        if (err) {
            return res.status(400).json(err);
        }
    });
    const updatedPost = req.body;
    let sql2 = "UPDATE posts SET title=?, content=? WHERE id=? and userId=?";
    console.log(updatedPost);
    dbc.query(sql2, [updatedPost.title, updatedPost.content, updatedPost.id, updatedPost.userId], (err, results, fields) => {
        if (err) {
            console.log(err);
            return res.status(400).json(err);
        }
        return res.status(200).json({ message: "Le post a bien été modifié !" });
    });
};

// supprimer un post
exports.deletePost = (req, res, next) => {
    console.log("Dans DELETE POST !");
    let sql1 = "SELECT * FROM posts WHERE id = ?"; // récupération du post par son id
    dbc.query(sql1, [req.params.id], (error, results, fields) => {
        if (error) {
            return res.status(400).json(error);
        }
        if (results.length > 0) {

            // if (isAdmin || connectedUser == results[0].userId)


            currentPost = results[0];
            console.log("CurrentPost : ", currentPost);
            console.log("tentative de suppression de l'image : " + './images/' + currentPost.image_url);

            fs.unlink('./images/' + currentPost.image_url, (err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Image supprimée");
                }
            }))
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
// Récupération de tous les commentaires qui correspondent à l'id du post fourni en paramètre. 
exports.getComments = (req, res, next) => {
    let sql = "SELECT comments.id as id, comments.*, users.username, users.avatar FROM comments JOIN users ON comments.userId = users.id  WHERE postId = ? ORDER BY comments.date_creation DESC";
    dbc.query(sql, [Number(req.params.id)], (err, result, fields) => {
        if (err) {
            return res.status(400).json(err);
        }
        console.log(result);
        console.log(req.params.id);
        res.status(200).json(result);
        
    });
};

// Créer un commentaire
exports.createComment = (req, res, next) => {
    let sql = "INSERT INTO comments (userId, postId, comContent) VALUES(?, ?, ?)";
    console.log(req.body);
    dbc.query(
        sql,
        [req.body.userId, req.body.postId, req.body.comContent],
        (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
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
exports.deleteComment = (req, res, next) => {
    let sql1 = "SELECT * FROM comments WHERE id = ?";
    dbc.query(sql1, [req.params.id], (error, results, fields) => {
        if (error) {
            return res.status(400).json(error);
        }

        // if result
        //    if (isAdmin || connectedUser == result[0].userId)
        //     Et la suppression réel (let sql2= ....) se fera à l'intérieur de ce if. 

    })
    let sql2 = "DELETE FROM comments WHERE id = ?";
    dbc.query(sql2, [req.params.id], (error, results, fields) => {
        if (error) {
            return res.status(400).json(error);
        }
        return res.status(200).json({ message: "Le commentaire a bien été supprimé." });
    })
}


// LIKES
