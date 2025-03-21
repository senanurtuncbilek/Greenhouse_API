const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const Greenhouse = require("./models/GreenHouse");
const User = require("./models/User");
const Sensor = require("./models/Sensor");
const greenhouseRoutes = require("./routes/greenhouseRoutes");
const sensorRoutes = require("./routes/sensorRoutes");



const app = express();


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/greenhouses", greenhouseRoutes);
app.use("/api/sensors", sensorRoutes);



// DB
User.hasMany(Greenhouse, { foreignKey: "userId" });
Greenhouse.belongsTo(User, { foreignKey: "userId" });

Greenhouse.hasMany(Sensor, { foreignKey: "greenhouseId" });
Sensor.belongsTo(Greenhouse, { foreignKey: "greenhouseId" });

sequelize.sync()
  .then(() => console.log("Tablolar senkronize edildi"))
  .catch((err) => {
    console.error("Senkronizasyon hatası:", err);
  });




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});