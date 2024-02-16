const router = require("express").Router();

const produkController = require("../controller/produkController");

router.post('/addProduk', produkController.addProduk);
router.get('/sort/harga', produkController.sortHarga);

module.exports = router;