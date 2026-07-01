const { House } = require("../model/houseSchema"); 

// -------------------- postHouse ------------------------------
const postHouse = async (req, res) => {
    try {
        const { 
            region,
            city,
            house_number,
            street,
            family_members,
            location 
        } = req.body;

        const newHouse = new House({ 
            region, 
            city, 
            house_number, 
            street, 
            family_members, 
            location 
        });

        await newHouse.save();
        res.status(201).json({ success: true, message: "Uy muvaffaqiyatli qo'shildi", data: newHouse });
    } catch (error) {
        res.status(500).json({ success: false, message: "Serverda xatolik yuz berdi", error: error.message });
    }
};

// -------------------- getHouses ------------------------------
const getHouses = async (req, res) => {
    try {
        const houses = await House.find();
        res.status(200).json({ success: true, message: "Barcha uylar ro'yxati", data: houses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ------------------- getHouseById ---------------------------
const getHouseById = async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) {
            return res.status(404).json({ success: false, message: "Uy topilmadi" });
        }
        res.status(200).json({ success: true, data: house });
    } catch (err) {
        res.status(500).json({ success: false, message: "Serverda xatolik yuz berdi" });
    }
};

// ---------------------- updateHouse --------------------------
const updateHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHouse = await House.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedHouse) {
            return res.status(404).json({ success: false, message: "Uy topilmadi" });
        }
        res.status(200).json({ success: true, message: "Uy muvaffaqiyatli yangilandi", data: updatedHouse });
    } catch (err) {
        res.status(500).json({ success: false, message: "Serverda xatolik yuz berdi", error: err.message });
    }
};

// ---------------------- searchHouse ------------------------
const searchHouse = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Qidiruv so'rovini kiriting" });
        }

        const result = await House.find({
            $or: [
                { region: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { street: { $regex: query, $options: "i" } }
            ],
        });

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Qidirishda xatolik yuz berdi" });
    }
};

// ----------------------- deleteHouse ---------------------------------------
const deleteHouse = async (req, res) => {
    try {
        const deletedHouse = await House.findByIdAndDelete(req.params.id);
        if (!deletedHouse) {
            return res.status(404).json({ success: false, message: "Uy topilmadi" });
        }
        res.status(200).json({ success: true, message: "Uy muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { 
    postHouse, 
    getHouses, 
    getHouseById, 
    updateHouse, 
    searchHouse, 
    deleteHouse
};