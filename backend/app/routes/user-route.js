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
router.post('/signup', multer, passwordValidation, userController.signup);
// Route to user login (post)
router.post('/login', userController.login);
// Route to delete a user (delete)
router.delete('/:id', auth, userController.deleteUser);
// Route to get a user by its id (get)
router.get('/:id', auth, userController.getOneUser);
// Route to  get all users (get)
router.get('/', auth, userController.getAllUsers);
// Route du modify a user (put)
router.put('/:id', auth, multer, userController.modifyUser);

module.exports = router;