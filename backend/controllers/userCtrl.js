const dbc = require("../database/db-config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Import du module filesystem
const fs = require('fs');

// SignUp

exports.signup = (req, res, next) => {
    const user = req.body;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!user.email.match(regexEmail)) {
        res.status(400).json({ message: "Email invalide." });
        return false;
    }
    if (user.username.length <=2){
        res.status(400).json({ message: "Pseudo invalide. Veuillez composer un pseudo d'au moins 2 caractères." });
            return false;
    }

    if (user.password.length <= 8) {
            res.status(400).json({ message: "Mot de passe invalide. Il doit avoir au moins 8 caractères." });
            return false;
        }
    bcrypt
        .hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
            let sql2 = "INSERT INTO users SET ?";
            dbc.query(
                sql2,
                user,
                (error, results, fields) => {
                    if (!results) {
                        //console.log(error)
                        res.status(400).json(error.sqlMessage);
                    } else {
                        res
                            .status(201)
                            .json({
                                message:
                                    "utilisateur créé. Vous pouvez à présent vous connecter.",
                            });
                    }
                }
            );
        })
        .catch((error) => res.status(500).json(error));
};

// Login
exports.login = (req, res, next) => {

    const emailReq = req.body.email;
    const passReq = req.body.password;

    if (emailReq && passReq) {
        const sql = "SELECT * FROM users WHERE email = ?";
        dbc.query(sql, emailReq, (err, results, fields) => {
            if (err) {
                // En cas d'erreur (eg : bdd pas lancée), on retourne l'erreur 500 et on s'arrête ici. 
                console.log(err);
                res.status(500).json({ message: "Problème serveur." });
                return;
            }
            if (results && results.length > 0) {

                bcrypt.compare(passReq, results[0].password).then((valid) => {
                    if (!valid) {
                        res.status(401).json({ message: "mot de passe incorrect." });
                    } else {

                        res.status(200).json({
                            userId: results[0].id,
                            username: results[0].username,
                            email: results[0].email,
                            avatar: results[0].avatar,
                            isAdmin: results[0].isAdmin,
                            token: jwt.sign({ userId: results[0].id, isAdmin: results[0].isAdmin }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }
                            )
                        })
                    }
                });
            } else {
                res.status(401).json({ message: "Email incorrect." });
            }
        });
    }
}
// Afficher tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    let sql = "SELECT * FROM users";
    dbc.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            return;
        }
        res.status(200).json(result);
    });
};
// Afficher un utilisateur
exports.getMyProfile = (req, res, next) => {
    let sql = "SELECT * FROM users WHERE id= ?";
    dbc.query(sql, [req.params.id], (err, result, fields) => {
        if (err) {
        }
        res.status(200).json(result[0]);
    });
};

// Modifier un utilisateur
exports.updateUser = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const connectedUserId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    let sql1 = "SELECT * FROM users WHERE id = ?";
    dbc.query(sql1, [req.params.id], (err, result, fields) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (result.length > 0) {
            if (isAdmin || connectedUserId == result[0].id) {
                console.log("J'ai les droits de modifications");
                if (typeof req.file != "undefined") {
                    let currentUser = result[0];
                    console.log("currentUser : ", currentUser);

                    fs.unlink('./images/' + currentUser.avatar, (err => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Image supprimée");
                        }
                    }))
                }
                const updatedUser = req.body;
                delete updatedUser.image;
                if (typeof req.file != "undefined") {
                    updatedUser.avatar = req.file.filename;
                    console.log("avatar", updatedUser.avatar);
                }

                let sql2 = " UPDATE users SET ? WHERE id = ?";
                console.log(updatedUser);
                dbc.query(sql2, [updatedUser, req.params.id], (err, result, fields) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    return res.status(200).json({ message: "Le profil a bien été modifié !" });
                });

            } else {
                // On est dans le cas où un utilisateur NON admin veut modifier
                // un profil qui n'est pas le sien
                return res.status(401).json("Vous ne pouvez pas modifier ce profil !");
            }
        }
    });


};

//Supprimer un compte utilisateur
exports.deleteUser = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log({ token, decodedToken });
    const connectedUserId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    // Si on est admin ou si on est l'utilisateur qu'on veut supprimer. 
    if (isAdmin || connectedUserId) {
        let sql1 = "SELECT * FROM users WHERE id = ?";
        dbc.query(sql1, [req.params.id], (err, result, fields) => {
            if (err) {
                return res.status(400).json(err);
            }

            if (result.length > 0) {
                if (isAdmin || connectedUserId == result[0].id) {
                    currentUser = result[0];

                    fs.unlink('./images/' + currentUser.avatar, (err => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Image supprimée");
                        }
                    }));

                    let sql2 = "DELETE FROM users WHERE users.id = ?";
                    dbc.query(sql2, [req.params.id], (err, result, fields) => {
                        if (err) {
                            return res.status(404).json({ err });
                        }
                        return res.status(200).json({ message: "Compte utilisateur supprimé." });
                    });
                } else {
                    return res.status(401).json("Vous n'avez pas le droit de supprimer ce profil.");
                }


            }
        })
    }
}


