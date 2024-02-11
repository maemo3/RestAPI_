const router = require("express").Router();
const userController = require("../controller/userController");

router.post('/register', userController.registerUser);
router.get('/forgot', userController.getUserInfo);
router.get('/getApi', userController.getApiKeys);
router.post('/loginUser', userController.loginUser);
router.get('/userAuth', userController.loginUserAuth);
router.get('/profile', userController.profileInfo);

module.exports = router;