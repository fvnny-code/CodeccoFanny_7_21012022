const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');

const cors = require("cors");
const morgan = require('morgan');

// Création de l'application express
const app = express();

// intercepte toutes les requêtes JSON et met à disposition le corps de la requête dans req.body
app.use(express.json());
// accès aux differents champs de formulaires
app.use(express.urlencoded({ extended: true }));

// dev control dans le terminal
// Ajoute des informations dans le terminal notamment sur les routes qui transitent.
// Très utile pour aider au debug 
app.use(morgan("dev"));

//cors
app.use(cors());

//Fichiers Routes
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');


// Gestion statique des fichiers image, afin de télécharger les images présentes dans le dossier "images"
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes
app.use('/api/post', postRouter); // posts
app.use('/api/auth', userRouter); // users


module.exports = app;