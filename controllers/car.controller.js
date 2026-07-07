const { Car } = require("../model/carSchema"); 

const postCar = async (req, res) => {
    try {
        const { 
            title, 
            model, 
            description, 
            color, 
            horsePower, 
            carType, 
            charging, 
            weight, 
            gasoline, 
            yearMachine, 
            price, 
            plate_number,
            passenger_capacity
        } = req.body; 
        
        const existingCar = await Car.findOne({ title, model });
        if (existingCar) {
            return res.status(400).json({ 
                success: false, 
                message: "Bu nom va modeldagi avtomobil allaqachon mavjud!" 
            });
        }
        
        const newCar = new Car({ 
            title, 
            model, 
            description, 
            color, 
            horsePower, 
            carType, 
            charging, 
            weight, 
            gasoline, 
            yearMachine, 
            price,
            plate_number,
            passenger_capacity
        });

        await newCar.save();
        res.status(201).json({ success: true, message: "Avtomobil bazaga qo'shildi", data: newCar });
    } catch (error) {
        res.status(500).json({ success: false, message: "Serverda xatolik yuz berdi", error: error.message });
    }
};

// -------------------- getCars ------------------------------
const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json({ success: true, message: "Barcha avtomobillar ro'yxati", data: cars });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ------------------- getCarById ---------------------------
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ success: false, message: "Avtomobil topilmadi" });
        }
        res.status(200).json({ success: true, data: car });
    } catch (err) {
        res.status(500).json({ success: false, message: "Serverda xatolik" });
    }
};

// ---------------------- updateCar --------------------------
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCar = await Car.findByIdAndUpdate(
            id,
            req.body, 
            { new: true }            
        );
        if (!updatedCar) {
            return res.status(404).json({ success: false, message: "Avtomobil topilmadi" });
        }
        res.json({ success: true, message: "Avtomobil muvaffaqiyatli tahrirlandi", data: updatedCar });
    } catch (err) {
        res.status(500).json({ success: false, message: "Serverda xatolik", error: err.message });
    }
};

// ---------------------- searchCar ------------------------
const searchCar = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Qidiruv so'rovini kiriting" });

        const result = await Car.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { model: { $regex: query, $options: "i" } },
                { color: { $regex: query, $options: "i" } },
                { carType: { $regex: query, $options: "i" } }
            ],
        });

        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Qidiruvda xatolik" });
    }
};

// ----------------------- deleteCar -----------------------
const deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ success: false, message: "Avtomobil topilmadi" });
        }
        res.status(200).json({ success: true, message: "Avtomobil o'chirildi", data: deletedCar });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { 
    postCar, 
    getCars, 
    getCarById, 
    updateCar, 
    searchCar, 
    deleteCar
};