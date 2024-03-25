const router = require("express").Router();

const adminController = require("../controller/adminController");

router.post("/register", adminController.registerAdmin);
router.get("/getApi", adminController.getApiKeys);
router.post("/loginUser", adminController.loginAdmin);
router.get("/login", adminController.loginAdminAuth);
router.get("/profile", adminController.profileInfo);

module.exports = router;
