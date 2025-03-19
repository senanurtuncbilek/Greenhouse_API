const jwt = require("jsonwebtoken");

// Yetkilendirme middleware
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Yetkisiz erişim, token eksik!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Geçersiz veya süresi dolmuş token!" });
    }
};
