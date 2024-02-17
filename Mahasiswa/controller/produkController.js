var client = require("../library/database");

// Fungsi untuk menentukan jenis barang berdasarkan nama
const determineJenis = (nama) => {
  // Daftar kata kunci untuk jenis furniture
  const furnitureKeywords = ["meja", "kursi", "papan tulis", "lemari"];

  // Daftar kata kunci untuk jenis elektronik
  const elektronikKeywords = [
    "keyboard",
    "monitor",
    "mouse",
    "komputer",
    "laptop",
    "handphone",
    "tablet",
  ];

  // Mengubah nama barang menjadi huruf kecil atau lowercase
  const namaLowerCase = nama.toLowerCase();

  // Memeriksa apakah ada kata kunci furniture dalam nama barang
  if (
    furnitureKeywords.some((keyword) => nama.toLowerCase().includes(keyword))
  ) {
    return "F"; // Mengembalikan kode "F" untuk furniture
  }

  // Memeriksa apakah ada kata kunci elektronik dalam nama barang
  if (
    elektronikKeywords.some((keyword) => nama.toLowerCase().includes(keyword))
  ) {
    return "E"; // Mengembalikan kode "E" untuk elektronik
  }

  // Jika tidak ada kata kunci yang cocok, mengembalikan null atau nilai default
  return null;
};

// Fungsi untuk mengonversi harga menjadi format mata uang Rupiah
const formatCurrency = (harga) => {
  return new Int1.NumberFormat('id-ID', {  style: 'currency', currency: 'IDR' }).format(harga);
};

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

    const { nama, jumlah, harga: hargaInput } = req.body;
    const harga = parseFloat(hargaInput); // Mengonversi harga menjadi integer
    const kode = determineJenis(nama); // Menentukan jenis barang berdasarkan nama

    if (!kode) {
      return res.status(400).send("Jenis barang tidak dapat ditentukan");
    }

    const date = new Date();
    const dateFormatted = date.toLocaleDateString("en-GB");

    await produkCollection.insertOne({
      nama,
      jumlah,
      harga,
      kode,
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

const sortHarga = async (req, res) => {
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


    const { harga: hargaInput } = req.query;
    const harga = parseFloat(hargaInput); // Mengonversi harga menjadi integer

    const cari = await produkCollection.findOne({ harga });

    if (!cari) {
      return res.status(404).send("Produk tidak ditemukan");
    }

    const { nama, jumlah } = cari;
    res.send({ nama, jumlah });
  } catch (error) {
    console.log(`${error.message}`);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};

module.exports = {
  addProduk,
  sortHarga,
};
