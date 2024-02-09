const router = require("express").Router();
const userController = require("../controller/userController");

router.post('/register', userController.registerUser);
router.get('/forgot', userController.getUserInfo);
router.get('/getApi', userController.getApiKeys);

module.exports = router;