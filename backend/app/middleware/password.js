//Import of password schema rules 
const passwordSchema = require('../models/password-model');

// Verification that the password validates the schema rules
module.exports = (req, res, next)=> {
    if(!passwordSchema.validate(req.body.password)) {
        res.status(400).json({error: "votre mot de passe doit être d'une longueur minimum de 8 caractères, doit contenir des majuscules et des minuscules et au moins 2 chiffres, et ne doit pas contenir d'espace."})
    } else {
        next();
    }
}