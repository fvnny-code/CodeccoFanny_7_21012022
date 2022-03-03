const express = require('express');
const apiRouter = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const userCtrl = require('../controllers/userCtrl');

try{
    apiRouter.post();
    apiRouter.post();
    apiRouter.get('/:id', auth, userCtrl.getOneUser);
    apiRouter.delete();
    apiRouter.put();

} catch(error){
    console.log(error);
}


module.exports = apiRouter;