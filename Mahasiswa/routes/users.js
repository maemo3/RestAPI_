const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/register", userController.registerUser);
router.get("/getApi", userController.getApiKeys);
router.post("/login", userController.loginUser);
router.get("/userAuth", userController.loginUserAuth);
router.get("/profile", userController.profileInfo);

module.exports = router;
