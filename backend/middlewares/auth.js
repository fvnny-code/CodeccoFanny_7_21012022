// Import du package jsonWebToken 
const jwt = require("jsonwebtoken");
// DB connection
const dbc = require("../database/db-config");


module.exports = (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1]; // récupération du token de l'entête
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Vérification du token avec la "clé secrète"
        const userId = decodedToken.userId; // On obtient un objet JS qu'on place dans une constante, et on y récupère l'userId pour comparaison le cas échéant.

        if (req.body.userId && req.body.userId !== userId) {
            throw "Identifiant non valable.";
        } 
        let sql = "SELECT COUNT(id) FROM users WHERE id= ?";
        dbc.query(sql, userId, (err, result) => {
            if (err) reject({ error: "Erreur dans l'inscription" });
            if (result[0]["COUNT(id)"] !== 1) {
                throw "Token invalide";
            } else {
                next();
            }
        });
    } catch (error) {
        console.log("Error in authentication", error.message);
        res.status(401).json({ error: error | "Requête non authentifiée" });
        return;
    }
};
