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
};
