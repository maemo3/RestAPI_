var client = require('../library/database');

router.get("/users", async (req, res) => {
  try {
    await client.connect();
    const users = await User.find();
    res.send({ data: users });
  } catch (err) {
    res.send({ message: "Internal Error" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findOne({ _id: id });
    if (userById) {
      res.send({ data: userById });
    } else {
      res.send({ message: "Data Is Not" });
    }
  } catch (err) {
    res.send({ message: "Internal Error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const insertData = await User.create({ name, age, status });
    if (insertData) {
      res.send({ data: insertData });
    } else {
      res.send({ message: "Data Is Not Added" });
    }
  } catch (err) {
    res.send({ message: "Internal Error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, status } = req.body;
    const updatedData = await User.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          age,
          status,
        },
      }
    );
    if (updatedData.modifiedCount === 1) {
      res.send({ data: updatedData });
    } else {
      res.send({ message: "Data Is Not Updated" });
    }
  } catch (err) {
    res.send({ message: err.message || "Internal Server Error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await User.deleteOne({ _id: ObjectId(id) });
    if (deletedData) {
      res.send({ data: deletedData });
    } else {
      res.send({ message: "Data Is Not Deleted" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;