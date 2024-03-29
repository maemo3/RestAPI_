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

  const wordElektronik = ["elektronik"];
  const wordFurniture = ["furniture"];

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

  if (wordElektronik.some((keyword) => nama.toLowerCase().includes(keyword))) {
    return "E";
  }

  if (wordFurniture.some((keyword) => nama.toLowerCase().includes(keyword))) {
    return "F";
  }

  // Jika tidak ada kata kunci yang cocok, mengembalikan null atau nilai default
  return null;
};

// Fungsi untuk mengonversi harga menjadi format mata uang Rupiah
const formatCurrency = (harga) => {
  return new Int1.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(harga);
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

    const { nama, jumlah: jumlahInput, harga: hargaInput } = req.body;
    const harga = parseFloat(hargaInput); // Mengonversi harga menjadi integer
    const jenis = determineJenis(nama); // Menentukan jenis barang berdasarkan nama
    const jumlah = parseInt(jumlahInput);

    if (!jenis) {
      return res.status(400).send("Jenis barang tidak dapat ditentukan");
    }

    // Mencari jumlah produk yang telah ada dengan jenis yang sama
    const existingProductCount = await produkCollection.countDocuments({
      jenis,
    });

    // Membuat kode barang dengan format "jenis + nomor urut"
    const kodeBarang = jenis + (existingProductCount + 1);

    const date = new Date();
    const dateFormatted = date.toLocaleDateString("en-GB");

    await produkCollection.insertOne({
      nama,
      jumlah,
      harga,
      jenis,
      kodeBarang,
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

const sortTanggal = async (req, res) => {
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

    const { date } = req.query;

    const cari = await produkCollection.find({ date: { $eq: date } }).toArray();

    if (!cari || cari.length === 0) {
      return res.status(404).send("Produk tidak ditemukan");
    }

    res.send(cari);
  } catch (error) {
    console.log(`${error.message}`);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};

const sortJenis = async (req, res) => {
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

    const { jenis: jenisInput } = req.query;
    const jenis = determineJenis(jenisInput);

    if (!jenis) {
      return res.status(400).send("Jenis barang tidak valid");
    }

    const cari = await produkCollection.find({ jenis }).toArray();

    if (!cari || cari.length === 0) {
      return res.status(404).send("Produk tidak ditemukan");
    }
    res.send(cari);
  } catch (error) {
    console.log(`${error.message}`);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};

const sortJumlah = async (req, res) => {
  try {
    await client.connect();

    const db = client.db("db_mahasiswa");
    const produkCollection = db.collection("produk");
    const profileCollection = db.collection("profile");

    const { apiKey } = req.query;
    let { jumlah } = req.query; // Mengambil nilai jumlah dari query

    if (!apiKey || !jumlah) {
      return res.status(400).send("Masukkan API Key dan jumlah");
    }

    const user = await profileCollection.findOne({ apiKey });

    if (!user) {
      return res.status(404).send("User tidak ditemukan");
    }

    // Konversi nilai jumlah menjadi integer
    jumlah = parseInt(jumlah);

    // Mencari produk dengan jumlah kurang dari atau sama dengan jumlah yang diberikan
    const cari = await produkCollection
      .find({ jumlah: { $lte: jumlah } }) // Menggunakan $lte untuk mencari jumlah yang kurang dari atau sama dengan jumlah yang diberikan
      .sort({ jumlah: 1 }) // Mengurutkan berdasarkan jumlah
      .toArray();

    if (!cari || cari.length === 0) {
      return res.status(404).send("Produk tidak ditemukan");
    }

    res.send(cari);

  } catch (error) {
    console.log(`${error.message}`);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
}


module.exports = {
  addProduk,
  sortHarga,
  sortTanggal,
  sortJenis,
  sortJumlah,
};
