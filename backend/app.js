const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
//const helmet = require('helmet');
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
app.use(morgan("dev"));

//cors
app.use(cors());


//HTTP headers protection 
//app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Routes files
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');

//Static management of image ressource
//To load files that are in the images directory.
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes
app.use('/api/post', postRouter); // posts
app.use('/api/auth', userRouter); // users


module.exports = app;