const express = require("express");
const apiRouter = express.Router();

// const auth = require("../middlewares/auth");
// const multer = require('../middlewares/multer-config');

const userCtrl = require("../controllers/userCtrl");

try {
  apiRouter.post("/signup", userCtrl.signup);
  apiRouter.post("/login", userCtrl.login);
  apiRouter.get('/:id', userCtrl.getMyProfile);
  apiRouter.put('/:id', userCtrl.updateUser);
  apiRouter.delete('/:id', userCtrl.deleteUser);

} catch (error) {
  console.log(error);
}

module.exports = apiRouter;
