var client = require("../library/database");

const addProduk = async (req, res) => {
  try {
    await client.connect();

    const db = client.db("db_mahasiswa");
    const collection = db.collection("produk");

    const { nama, jumlah, harga } = req.body;
    const { apiKey } = req.query;

    if (apiKey !== "14230c6702a848fc") {
      return res.status(403).send({ message: "User Ditolak" });
    }

    const date = new Date();
    const dateFormatted = date.toLocaleDateString();

    await collection.insertOne({
      nama,
      jumlah,
      harga,
      time: dateFormatted,
    });

    console.log("Data Ditambahkan");
    res.send("Produk berhasil ditambahkan");
  } catch (error) {
    console.log(`${error.message}`);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close;
  }
};

module.exports = {
  addProduk,
};
