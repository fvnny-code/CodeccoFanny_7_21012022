const express = require('express');
// Import middleware Authorize
const auth = require('../middleware/auth');
//Import middleware Multer to manage images
const multer = require('../middleware/multer-config');
//Call of the express router with its method
const router = express.Router();

// Import users controllers. Functions are associated with the different routes.
const userController = require('../controllers/user-controller');
//Import password schema rules. Functions are associated with the different routes.
const passwordValidation = require ('../middleware/password');

//CRUD//
//Route to create a user (post)

// Route to user login (post)

// Route to delete a user (delete)

// Route to get a user by its id (get)

// Route to  get all users (get)

// Route du modify a user (put)

module.exports = router;