const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./routes/user");

const startServer = async () => {
  const PORT = 3000;
  const DB_CONNECTION = "mongodb://localhost:27017/authapp";
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/users", user);
  await mongoose
    .connect(DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Database connection established"))
    .catch((err) => console.log(err));

  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
};
startServer();
