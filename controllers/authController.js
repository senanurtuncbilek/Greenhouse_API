const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Kullanıcı kaydı başarısız." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Geçersiz e-posta veya şifre!" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Oluşturulan Token:", token);

        res.json({ message: "Giriş başarılı!", token });
    } catch (error) {
        console.error("Giriş hatası:", error);
        res.status(500).json({ error: "Giriş yapılamadı." });
    }
};


exports.getProfile = (req, res) => {
    res.json({ message: "Profil bilgileri", user: req.user });
};

