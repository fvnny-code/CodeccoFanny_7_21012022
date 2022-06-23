const express = require("express");
const apiRouter = express.Router();

const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');

const userCtrl = require("../controllers/userCtrl");

// Toutes les routes ici commencent par /api/auth (comme "authentification")
try {
    apiRouter.post("/signup", userCtrl.signup);
    apiRouter.post("/login", userCtrl.login);
    apiRouter.get('/', auth, userCtrl.getAllUsers);
    apiRouter.get('/:id', auth, userCtrl.getMyProfile);
    apiRouter.put('/:id', auth, multer, userCtrl.updateUser);
    apiRouter.delete('/:id', auth, userCtrl.deleteUser);

} catch (error) {
    console.log("Dans userRoute.js ", error);
}

module.exports = apiRouter;
