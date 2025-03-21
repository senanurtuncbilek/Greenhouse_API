const express = require("express");
const router = express.Router();
const greenhouseController = require("../controllers/greenhouseController");
const authMiddleware = require("../middlewares/authMiddleware");

// Ekle
router.post("/", authMiddleware.verifyToken, greenhouseController.createGreenhouse);

// Listele
router.get("/", authMiddleware.verifyToken, greenhouseController.getAllGreenhouses);

// Güncelle
router.put("/:id", authMiddleware.verifyToken, greenhouseController.updateGreenhouse);

// Sil 
router.delete("/:id", authMiddleware.verifyToken, greenhouseController.deleteGreenhouse);

module.exports = router;
