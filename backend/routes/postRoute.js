const express = require('express');
const apiRouter = express.Router();

// const auth = require('../middlewares/auth');
// const multer = require('../middlewares/multer-config');

const postCtrl = require('../controllers/postCtrl')

try{

//Posts
apiRouter.get('/', postCtrl.getAllPosts);
apiRouter.get('/:id', postCtrl.getOnePost);
apiRouter.post('/', postCtrl.createPost);
apiRouter.put('/:id', postCtrl.updatePost);
apiRouter.delete('/:id', postCtrl.deletePost);

//likes
// apiRouter.get();
// apiRouter.post();

//Comments
apiRouter.get('/:id/comments', postCtrl.getComments); // à quoi correspond '/:id' ici ? - Parce que sans id return [] et avec n'importe quel id on obtient tous les commentaires.
apiRouter.post('/:id/comments', postCtrl.createComment);
apiRouter.put('/comments/:id', postCtrl.updateComment);
apiRouter.delete('/comments/:id', postCtrl.deleteComment);


} catch(error){
    console.log(error);
}


module.exports = apiRouter;