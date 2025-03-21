const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Greenhouse = require("./GreenHouse");

const Sensor = sequelize.define("Sensor", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  greenhouseId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Greenhouse, key: "id" } 
  },
  temperature: { type: DataTypes.FLOAT, allowNull: false },
  humidity: { type: DataTypes.FLOAT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Sensor;
