
// Import de MULTER pour la gestion des images.
const multer = require("multer");
const path = require('path');


// liste des formats acceptés (MIME_TYPES)
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif" : "gif"
};


// Destination de sotackage et noms des fichiers
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(".")[0];
        name = name.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

module.exports = multer({ storage }).single("image");


