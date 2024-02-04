// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
//export controller
const mahasiswaController = require("../controllers/mahasiswaController");

//endpoint mahasiswa
router.get("/", mahasiswaController.viewMahasiswa);  // untuk view
router.post('/', mahasiswaController.addMahasiswa);
router.put('/', mahasiswaController.editMahasiswa);

//export module
module.exports = router;