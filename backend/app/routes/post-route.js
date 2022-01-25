// Import Express : Use express router
const express = require('express');
// Import authorize
const auth = require('../middleware/auth');
// Import Multer to manage images
const multer = require('../middleware/multer-config');
// Call of express with router method
const router = express.Router();

// Import posts controllers. Function ara associated with different routes
const postController = require('../controllers/post-controller');
// Import comments controllers. Function ara associated with different routes
const commentController = require('../controllers/comment-controller');

// POSTS
// Route to create a post
router.post('/', auth, multer, postController.createPost);
// Route to modify a post
router.put('/:id', auth, multer, postController.modifyPost);
// Route to delete a post
router.delete('/:id', auth,multer, postController.deletePost);
// Route to get one post
router.get('/;id', auth, postController.getOnePost);
// Rouet to get all posts
router.get('/:id', auth, postController.getAllPosts);

// COMMENTS
// Route to create a comment
router.post('/:id/comments', auth, commentController.createComment);
//Route to modify a comment
router.put('/:id/comments/:id', auth, commentController.modifyComment);
// Route to delete a comment
router.delete('/:id/comment/:id', auth, commentController.deleteComment);
// Route to get all comments
router.get('/:id/comments', auth, commentController.getAllComments);

module.exports = router;