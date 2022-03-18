const express = require('express');
const apiRouter = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postCtrl = require('../controllers/postCtrl')

try{

//Posts
// apiRouter.get();
// apiRouter.post();
// apiRouter.put();
// apiRouter.delete();

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

apiRouter.get('/', postCtrl.getAllPosts);
// apiRouter.get('/:id', postCtrl.getOnePost);
// apiRouter.delete('/:id', postCtrl.deleteOnePost);
// apiRouter.put('/:id', postCtrl.updatePost);



module.exports = apiRouter;