const router = require("express").Router();

const produkController = require("../controller/produkController");

router.post('/addProduk', produkController.addProduk);

module.exports = router;