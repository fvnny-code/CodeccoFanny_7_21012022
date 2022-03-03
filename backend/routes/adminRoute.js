const express = require('express');
const apiRouter = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const adminCtrl = require('../controllers/adminCtrl');

try{
    apiRouter.get(); // comments
    apiRouter.get(); // posts
    apiRouter.delete(); //comment
    apiRouter.delete(); //post

} catch(error){
    console.log(error);
}



module.exports = apiRouter;