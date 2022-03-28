const express = require("express");
const apiRouter = express.Router();

const auth = require("../middlewares/auth");
// const multer = require('../middlewares/multer-config');

const userCtrl = require("../controllers/userCtrl");

try {
  apiRouter.post("/signup",auth, userCtrl.signup);
  apiRouter.post("/login", auth, userCtrl.login);
  apiRouter.get('/:id',auth, userCtrl.getMyProfile);
  apiRouter.put('/:id', auth, userCtrl.updateUser);
  apiRouter.delete('/:id', auth, userCtrl.deleteUser);

} catch (error) {
  console.log(error);
}

module.exports = apiRouter;
