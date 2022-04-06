const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require("cors");
const morgan = require('morgan');

// Création de l'application express
const app = express();
// intercepte toutes les requêtes JSON et met à disposition le corps de la requête dans req.body
app.use(express.json());
// accès aux differents champs de formulaires
app.use(express.urlencoded({ extended: true }));
// dev control dans le terminal
app.use(morgan("dev"));
//cors
app.use(cors());


//HTTP headers protection
app.use(helmet());

//Routes files
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');
const uploadRouter = require('./routes/uploadRoute')
// const adminRouter = require('./routes/adminRoute');


//Routes
app.use('/api/post', postRouter); // posts
app.use('/api/auth', userRouter); // users

// app.use('/api/admin', adminRouter); // admin

//To load files that are in the images directory.
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;


