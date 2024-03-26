var client = require("../library/database");
const crypto = require("crypto");
const basicAuth = require("basic-auth");
const bcrypt = require("bcrypt");
// Menentukan seberapa banyak putaran yang akan digunakan dalam proses enkripsi
const saltRounds = 10;

module.exports = {
  registerAdmin: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const userCollection = db.collection("user");
      const profileCollection = db.collection("profile");

      const { username, email, password, fullName, phoneNumber, address } =
        req.body;

      // Enkripsi password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Generate API keys
      const apiKey = crypto.randomBytes(8).toString("hex");

      await userCollection.insertOne({
        username,
        email,
        password: hashedPassword,
        apiKey, // Add ApiKeys
        tipe_akun: 1,
      });

      await profileCollection.insertOne({
        username,
        fullName,
        phoneNumber,
        address,
        apiKey, // Add ApiKeys
        akses: "admin",
      });

      console.log("User dibuat");
      res.send(`User Dibuat dengan ApiKeys : ${apiKey}`);
    } catch (error) {
      console.log(`${error.message}`);
      res.send("Registrasi Gagal");
    } finally {
      await client.close();
    }
  },

  loginAdmin: async (req, res) => {
    try {
        await client.connect();

        const db = client.db("db_mahasiswa");
        const collection = db.collection("user");

        const { username, email, password } = req.body;

        const user = await collection.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (!user) {
            return res.status(401).send("Username/Email atau password salah");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send("Username/Email atau password salah");
        }

        res.send("Selamat Datang");
    } catch (error) {
        console.log(`${error.message}`);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
},

loginAdminAuth: async (req, res) => {
    try {
        const credentials = basicAuth(req);

        if (!credentials || !credentials.name || !credentials.pass) {
            res.setHeader("WWW-Authenticate", 'Basic realm="example"');
            return res.status(401).send("Akses Ditolak");
        }

        await client.connect();

        const db = client.db("db_mahasiswa");
        const collection = db.collection("user");

        const { name: username, pass: password } = credentials;

        const user = await collection.findOne({
            username,
        });

        if (!user) {
            return res.status(401).send("Username atau password salah");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send("Username atau password salah");
        }

        res.send("Selamat Datang");
    } catch (error) {
        console.log(`${error.message}`);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
},


  getApiKeys: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("user");

      const { username, password } = req.query;

      if (!username || !password) {
        return res.status(400).send("Masukkan nama pengguna dan kata sandi");
    }

    const user = await collection.findOne({
      username,
  });

  if (!user) {
      return res.status(401).send("Username atau password salah");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      return res.status(401).send("Username atau password salah");
  }

  // Jika autentikasi berhasil, kembalikan apiKey
  res.send({ apiKey: user.apiKey });
    } catch (error) {
      console.log(`${error.message}`);
      res.status(500).send("Internal Server Error");
    } finally {
      await client.close();
    }
  },

  profileInfo: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("profile");

      const { apiKey } = req.query;

      if (!apiKey) {
        return res.status(400).send("Masukan API Key");
      }

      const user = await collection.findOne({ apiKey });

      if (!user) {
        return res.status(404).send("User tidak ditemukan");
      }

      //Menampilkan hanya username dan password
      const { username, fullName, phoneNumber, address } = user;
      res.send({ username, fullName, phoneNumber, address });
    } catch (error) {
      console.log(`${error.message}`);
      res.status(500).send("Internal Server Error");
    } finally {
      await client.close();
    }
  },
};
