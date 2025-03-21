const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");


router.post("/", sensorController.createSensorData);
router.get("/", sensorController.getAllSensorData);
router.get("/:greenhouseId", sensorController.getSensorDataByGreenhouse);
router.delete("/:id", sensorController.deleteSensorData);

module.exports = router;
