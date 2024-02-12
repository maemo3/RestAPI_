const router = require("express").Router();
const userController = require("../controller/userController");
const produkController = require("../controller/produkController");

router.post('/register', userController.registerUser);
router.get('/forgot', userController.getUserInfo);
router.get('/getApi', userController.getApiKeys);
router.post('/loginUser', userController.loginUser);
router.get('/userAuth', userController.loginUserAuth);
router.get('/profile', userController.profileInfo);
router.post('/addProduk', produkController.addProduk);

module.exports = router;