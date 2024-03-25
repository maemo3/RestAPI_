const router = require("express").Router();

const produkController = require("../controller/produkController");

router.post("/addProduk", produkController.addProduk);
router.get("/sort/harga", produkController.sortHarga);
router.get("/sort/date", produkController.sortTanggal);
router.get("/sort/jenis", produkController.sortJenis);
router.get("/sort/jumlah", produkController.sortJumlah);

module.exports = router;
