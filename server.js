require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");

const app = express();


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);


sequelize.sync({ alter: true })
         .then(() => console.log("Tablolar senkronize edildi"))
         .catch(err => console.error("Senkronizasyon hatası!"));

app.get("/", (req, res) => {
    res.json({ message: "Sera Yönetim API'ye hoş geldiniz!" });
});


// app.use((req, res, next) => {
//     console.log(`API isteği alındı: ${req.method} ${req.url}`);
//     console.log("Gelen veriler:", req.body); // **Gelen veriyi terminalde yazdıralım**
//     next();
// });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});