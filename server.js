const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/Product");
const cartRoutes = require("./routes/cart");

//connect to server
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.json("server started");
});

//connect to db
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => console.log("Failed", error));

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/api", cartRoutes);
