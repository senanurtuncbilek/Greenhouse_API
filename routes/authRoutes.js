const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);


router.get("/profile", authMiddleware.verifyToken, authController.getProfile);

module.exports = router;
