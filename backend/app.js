//Import Dot env package: To mask connections informations.
require('dotenv').config();

//Import Express (Node JS Framework)
const express = require('express');
//Import Body Parser: To extract the Json object from the POST request.
const bodyParser = require('body-parser');
//Import Helmet package: To secure Express apps by setting various HTTP headers.
const helmet = require("helmet");
//Import Patch: To work with file and directory paths.
const path = require('path');
//Cross Origin Resource Sharing Management
const cors = require('cors');



//Cross Origin Resource Sharing Management
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

//Create Express application.
const app = express();

//Transform the data from POST method to JSon
app.use(bodyParser.json());

//HTTP headers protection
app.use(helmet());
//cors
app.use(cors());

//Import user routes.
const userRoutes = require('./routes/user');
//Import post routes.
const postRoutes = require('./routes/post');

//To load files that are in the images directory.
app.use('/images', express.static(path.join(__dirname, 'images')));
//Serve the route for user.
app.use('/api/auth', userRoutes);
//Serve the route for post.
// app.use('/api/posts', postRoutes);

module.exports = app;