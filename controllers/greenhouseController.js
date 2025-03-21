const Greenhouse = require("../models/GreenHouse");

exports.createGreenhouse = async (req, res) => {
    try {
        const { name, location, cropType } = req.body;
        const userId = req.user.id;

        const newGreenhouse = await Greenhouse.create({ name, location, cropType, userId });

        res.status(201).json({ message: "Sera başarıyla oluşturuldu.", greenhouse: newGreenhouse });
    } catch (error) {
        res.status(500).json({ error: "Sera eklenemedi." });
    }
};

exports.getAllGreenhouses = async (req, res) => {
    try {
        const userId = req.user.id;
        const greenhouses = await Greenhouse.findAll({ where: { userId } });

        res.json({ message: "Seralar listelendi.", greenhouses });
    } catch (error) {
        res.status(500).json({ error: "Seralar listelenemedi." });
    }
};

exports.updateGreenhouse = async (req, res) => {
    try {
        const { name, location, cropType } = req.body;
        const userId = req.user.id;
        const greenhouseId = req.params.id;

        const greenhouse = await Greenhouse.findOne({ where: { id: greenhouseId, userId } });

        if (!greenhouse) {
            return res.status(404).json({ error: "Sera bulunamadı." });
        }

        greenhouse.name = name || greenhouse.name;
        greenhouse.location = location || greenhouse.location;
        greenhouse.cropType = cropType || greenhouse.cropType;

        await greenhouse.save();

        res.json({ message: "Sera güncellendi.", greenhouse });
    } catch (error) {
        res.status(500).json({ error: "Sera güncellenemedi." });
    }
};

exports.deleteGreenhouse = async (req, res) => {
    try {
        const userId = req.user.id;
        const greenhouseId = req.params.id;

        const greenhouse = await Greenhouse.findOne({ where: { id: greenhouseId, userId } });

        if (!greenhouse) {
            return res.status(404).json({ error: "Sera bulunamadı." });
        }

        await greenhouse.destroy();

        res.json({ message: "Sera başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ error: "Sera silinemedi." });
    }
};
