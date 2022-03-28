const express = require('express');
const apiRouter = express.Router();

// const auth = require('../middlewares/auth');
// const multer = require('../middlewares/multer-config');

const adminCtrl = require('../controllers/adminCtrl');

try{
    apiRouter.get('/posts', adminCtrl.getAllPosts); // posts
    apiRouter.get('/comments', adminCtrl.getAllComments); // comments
    apiRouter.delete('/comments/:id', adminCtrl.deleteComment); //comment
    apiRouter.delete('/comments/:id', adminCtrl.deletePostByAdmin); //post

} catch(error){
    console.log(error);
}



module.exports = apiRouter;