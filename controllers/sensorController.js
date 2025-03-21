const Sensor = require("../models/Sensor");
const Greenhouse = require("../models/GreenHouse");


exports.createSensorData = async (req, res) => {
    try{
        const { greenhouseId, temperature, humidity} = req.body;

        const greenhouse = await Greenhouse.findByPk(greenhouseId);
        if(!greenhouse){
            return res.status(404).json({ error: "Geçersiz ID!"});
        }

        const newSensorData = await Sensor.create({ greenhouseId, temperature, humidity });
        

        res.status(201).json({ message: "Sensör data eklendi."});

    }
    catch(error){
        console.error("Sensör ekleme hatası!");
        res.status(500).json( {error: "Veri eklenemedi!"});
    }

};


exports.getAllSensorData = async (req, res) => {
    try {
        const sensors = await Sensor.findAll({ include: Greenhouse });
        res.json({ message: "Sensör verileri listelendi.", sensors });
    } catch (error) {
        res.status(500).json({ error: "Sensör verileri listelenemedi!" });
    }
};

// Bir seraya ait sensör verisi görüntüleme
exports.getSensorDataByGreenhouse = async (req, res) => {
    try {
        const { greenhouseId } = req.params;
        const sensors = await Sensor.findAll({ where: { greenhouseId } });

        if (sensors.length === 0) {
            return res.status(404).json({ error: "Bu seraya ait sensör verisi bulunamadı." });
        }

        res.json({ message: "Sensör verileri listelendi.", sensors });
    } catch (error) {
        res.status(500).json({ error: "Sensör verileri alınamadı!" });
    }
};


exports.deleteSensorData = async (req, res) => {
    try {
        const { id } = req.params;
        const sensor = await Sensor.findByPk(id);

        if (!sensor) {
            return res.status(404).json({ error: "Sensör verisi bulunamadı!" });
        }

        await sensor.destroy();
        res.json({ message: "Sensör verisi başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ error: "Sensör verisi silinemedi!" });
    }
};

