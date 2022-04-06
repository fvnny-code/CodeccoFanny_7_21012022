const express = require('express'); 
const apiRouter = express.Router(); 

 
const multer = require('../middlewares/multer-config'); 
const auth = require('../middlewares/auth')

const imageCtrl = require('../controllers/uploadCtrl');

apiRouter.post('/', multer, imageCtrl.upload);

module.exports = apiRouter;