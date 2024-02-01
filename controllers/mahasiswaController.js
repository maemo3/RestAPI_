var client = require('../library/database');

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
      const { nama, nim, jurusan, alamat } = req.body;

      // Menambahkan data mahasiswa
      await collection.insertOne({ nama, nim, jurusan, alamat });

      req.flash("alertMessage", "Data berhasil disimpan.");
      req.flash("alertStatus", "success");
      res.redirect("/mahasiswa"); //akan otomtis redirect jika sukses
    } catch (error) {
      console.error(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect('/mahasiswa');
    } finally {
      await client.close();
    }
  }
};
