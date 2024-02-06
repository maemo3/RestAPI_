const mongoose = require('mongoose');

// Mmebuat variabel baru
const mahasiswaScheme = new mongoose.Schema({
    nama: {
        // Membuat Type string
        type: String,
        // ketika data disimpan, data tidak boleh kosong
        required: true,
    },
    nim: {
        // Membuat type number
        type: Number,
        required: true,
    },
    jurusan: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
});

// export model dari mahasiswa
module.exports = mongoose.model("Mahasiswa", mahasiswaScheme);