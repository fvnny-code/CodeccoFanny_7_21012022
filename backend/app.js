//Import Dot env package: To mask connections informations.
require('dotenv').config();

//Import Express (Node JS Framework)
const express = require('express');
//Import Patch: To work with file and directory paths.
const path = require('path');
//Import Body Parser: To extract the Json object from the POST request.
const bodyParser = require('body-parser');
//Import Helmet package: To secure Express apps by setting various HTTP headers.
const helmet = require("helmet");
//Cross Origin Resource Sharing Management
const cors = require('cors');

//Create Express application.
const app = express();

//Transform the data from POST method to JSons
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//HTTP headers protection
app.use(helmet());
//cors
app.use(cors());

//Import user routes.
const userRoutes = require('./app/routes/user-route');
//Import post routes.
const postRoutes = require('./app/routes/post-route');

//To load files that are in the images directory.
app.use('/images', express.static(path.join(__dirname, 'images')));

//Serve the route for user.
app.use('/api/auth', userRoutes);
//Serve the route for post.
app.use('/api/posts', postRoutes);


module.exports = app;