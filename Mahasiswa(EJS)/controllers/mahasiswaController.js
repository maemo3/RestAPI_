var client = require("../library/database");

// menggunakan metode export
module.exports = {
  // membuat view untuk mahasiswa
  viewMahasiswa: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("mahasiswa");

      // Mendapatkan semua mahasiswa dari database
      const mahasiswa = await collection.find().toArray();

      const alertMessage = req.flash("alertMessage");
      const allertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: allertStatus,
      };

      res.render("index", {
        mahasiswa,
        alert,
        title: "CRUD", //title app
      });
    } catch (error) {
      console.error(error);
      res.redirect("/mahasiswa");
    } finally {
      await client.close();
    }
  },

  addMahasiswa: async (req, res) => {
    // validasi data dari form
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("mahasiswa");

      //membuat contanta nama,nim,jurusan,alamat
      const {
        nama,
        nim,
        jurusan,
        alamat
      } = req.body;

      // Menambahkan data mahasiswa
      await collection.insertOne({
        nama,
        nim,
        jurusan,
        alamat
      });

      req.flash("alertMessage", "Data berhasil disimpan.");
      req.flash("alertStatus", "success");
      res.redirect("/mahasiswa"); //akan otomtis redirect jika sukses
    } catch (error) {
      console.error(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/mahasiswa");
    } finally {
      await client.close();
    }
  },
  // Membuat update data untuk mahasiswa
  // Membuat update data untuk mahasiswa
  editMahasiswa: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("mahasiswa");

      // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
      const {
        nim,
        nama,
        jurusan,
        alamat
      } = req.body;

      // Cari mahasiswa berdasarkan NIM
      const mahasiswa = await collection.findOne({
        nim: nim
      });

      // Jika mahasiswa ditemukan, lakukan update
      if (mahasiswa) {
        // Update data mahasiswa
        await collection.updateOne({
          nim: nim
        }, {
          $set: {
            nama,
            nim,
            jurusan,
            alamat
          }
        });

        req.flash("alertMessage", "Data Berhasil Diubah!");
        req.flash("alertStatus", "success");
      } else {
        // Jika mahasiswa tidak ditemukan, berikan pesan kesalahan
        req.flash("alertMessage", "Mahasiswa tidak ditemukan.");
        req.flash("alertStatus", "danger");
      }
    } catch (error) {
      // Jika terjadi kesalahan, berikan pesan kesalahan
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    } finally {
      await client.close();
      // Setelah selesai, redirect ke halaman mahasiswa
      res.redirect("/mahasiswa");
    }
  },
  //Menghapus Data Mahasiswa
  deleteMahasiswa: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("mahasiswa");

      // Ambil nim dari parameter URL
      const nim = req.params.nim;

      // Cek data Mahasiswa yang akan dihapus berdasarkan nim
      const mahasiswa = await collection.findOne({
        nim: nim
      });

      // Jika mahasiswa ditemukan, lakukan penghapusan
      if (mahasiswa) {
        // Hapus data mahasiswa berdasarkan nim
        await collection.deleteOne({
          nim: nim
        });

        req.flash("alertMessage", "Data Mahasiswa berhasil dihapus");
        req.flash("alertStatus", "warning");
      } else {
        // Jika mahasiswa tidak ditemukan, berikan pesan kesalahan
        req.flash("alertMessage", "Mahasiswa tidak ditemukan.");
        req.flash("alertStatus", "danger");
      }
    } catch (error) {
      // Jika terjadi kesalahan, berikan pesan kesalahan
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    } finally {
      await client.close();
      // Setelah selesai, redirect ke halaman mahasiswa
      res.redirect("/mahasiswa");
    }
  },
};