const express = require('express');
const apiRouter = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postCtrl = require('../controllers/postCtrl')

// Toutes les routes ici commencent par /api/post (parce que appelée comme ça depuis app.js)
try {

    //Posts
    apiRouter.get('/', auth, postCtrl.getAllPosts);
    apiRouter.get('/:id', auth, postCtrl.getOnePost);
    apiRouter.post('/', auth, multer, postCtrl.createPost);
    apiRouter.put('/:id', auth, multer, postCtrl.updatePost);
    apiRouter.delete('/:id', auth, postCtrl.deletePost);

    //Comments
    apiRouter.get('/:id/comments', auth, postCtrl.getComments); // On retourne l'ensemble des commentaires qui correspondent au post :id 
    apiRouter.post('/:id/comments', auth, postCtrl.createComment);
    // apiRouter.put('/comments/:id', auth, postCtrl.updateComment);
    apiRouter.delete('/:idPost/comments/:id', auth, postCtrl.deleteComment);


} catch (error) {
    console.log("Dans postRoute.js ", error);
}

module.exports = apiRouter;