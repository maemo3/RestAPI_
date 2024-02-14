var client = require("../library/database");

const addProduk = async (req, res) => {
  try {
    await client.connect();

    const db = client.db("db_mahasiswa");
    const produkCollection = db.collection("produk");
    const profileCollection = db.collection("profile");

    const { apiKey } = req.query;

    if (!apiKey) {
      return res.status(400).send("Masukan API Key");
    }

    const user = await profileCollection.findOne({ apiKey });

    if (!user) {
      return res.status(404).send("User tidak ditemukan");
    }

    const { akses } = user;
    
    if (akses !== "admin") {
      return res.status(401).send("Hanya admin yang dapat menambahkan produk");
    }

    const { nama, jumlah, harga } = req.body;
    const date = new Date();
    const dateFormatted = date.toLocaleDateString('en-GB');

    await produkCollection.insertOne({
      nama,
      jumlah,
      harga,
      date: dateFormatted,
    });

    console.log("Data Ditambahkan");
    res.send("Produk berhasil ditambahkan");
  } catch (error) {
    console.log(`${error.message}`);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};

module.exports = {
  addProduk,
};
