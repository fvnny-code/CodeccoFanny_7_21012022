const dbc = require("../database/db-config");

exports.upload = (req, res, next)=>{
    if(res){
        res.status(200).json({ message:"image téléchargée avec succès.", url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
    } else{
        res.status(500).json({ message: "une erreur est survenue." })
    }
}
