// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
//export controller
const mahasiswaController = require("../controllers/mahasiswaController");

//endpoint mahasiswa
router.get("/", mahasiswaController.viewMahasiswa);  // menampilkan data pada tabel
router.post('/', mahasiswaController.addMahasiswa); // membuat data
router.put('/', mahasiswaController.editMahasiswa); //mengupdate data berdasarkan nim
router.delete('/:nim', mahasiswaController.deleteMahasiswa); //menghapus data berdasarkan nim

//export module
module.exports = router;