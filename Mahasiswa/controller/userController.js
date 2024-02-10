var client = require("../library/database");
const crypto = require("crypto");
const basicAuth = require('basic-auth');

module.exports = {
  registerUser: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("user");

      const { username, email, password } = req.body;

      // Generate API keys
      const apiKey = crypto.randomBytes(8).toString("hex");

      await collection.insertOne({
        username,
        email,
        password,
        apiKey, // Add ApiKeys
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

  loginUser: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("user");

      const { username, email, password } = req.body;

      const user = await collection.findOne({
        $or: [{ username: username }, { email: email }],
        password: password,
      });

      if (!user) {
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

  loginUserAuth: async (req, res) => {
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
        username, password
      });
      
      if (!user) {
        return res.status(401).send("Username atau password salah")
      }

      res.send("Selamat Datang");
    } catch (error) {
      console.log(`${error.message}`);
      res.status(500).send("Internal Server Error");
    } finally {
      await client.close();
    }
  },

  getUserInfo: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("user");

      const { email } = req.query;

      const user = await collection.findOne({ email });

      if (!user) {
        return res.status(404).send("User tidak ditemukan");
      }

      //Menampilkan hanya username dan password
      const { username, password } = user;
      res.send({ username, password });
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

      const api = await collection.findOne({ username, password });

      if (!api) {
        return res.status(404).send("User tidak ditemukan");
      }

      //menampilkan API
      const { apiKey } = api;
      res.send({ apiKey });
    } catch (error) {
      console.log(`${error.message}`);
      res.status(500).send("Internal Server Error");
    } finally {
      await client.close();
    }
  },
};
