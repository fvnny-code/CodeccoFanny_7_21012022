const express = require('express');
const apiRouter = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

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
// apiRouter.get();
// apiRouter.post();
// apiRouter.put();
// apiRouter.delete();


} catch(error){
    console.log(error);
}


module.exports = apiRouter;