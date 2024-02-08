var client = require("../library/database");

module.exports = {
  registerUser: async (req, res) => {
    try {
      await client.connect();

      const db = client.db("db_mahasiswa");
      const collection = db.collection("user");

      const { username, email, password } = req.body;

      await collection.insertOne({
        username,
        email,
        password,
      });

      console.log("User dibuat")
      res.send("Registrasi Berhasil")
    } catch (error) {
     console.log(`${error.message}`);
     res.send("Registrasi Gagal")
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

      if(!user) {
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
  }
};
