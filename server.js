require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
const Greenhouse = require("./models/GreenHouse");
const greenhouseRoutes = require("./routes/greenhouseRoutes");

const app = express();


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/greenhouses", greenhouseRoutes);


sequelize.sync()
  .then(() => console.log("Tablolar senkronize edildi"))
  .catch((err) => {
    console.error("Senkronizasyon hatası:", err);
  });




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});