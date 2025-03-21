const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Greenhouse = sequelize.define(
  "Greenhouse",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    cropType: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Greenhouse;
