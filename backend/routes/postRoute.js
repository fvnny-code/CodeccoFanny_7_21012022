const express = require('express');
const apiRouter = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postCtrl = require('../controllers/postCtrl')

try{

//Posts
apiRouter.get('/', postCtrl.getAllPosts);
apiRouter.get('/:id', postCtrl.getOnePost);
apiRouter.post('/', auth, postCtrl.createPost);
apiRouter.put('/:id', auth, postCtrl.updatePost);
apiRouter.delete('/:id', auth, postCtrl.deletePost);

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