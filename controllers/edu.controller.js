const { Edu } = require("../model/eduSchema"); 

const postEdu = async (req, res) => {
    try {
        const { 
            city, 
            street, 
            center_name, 
            branch, 
            rating 
        } = req.body;

        
        const existingEdu = await Edu.findOne({ center_name, branch, city });

        if (existingEdu) {
            return res.status(400).json({ 
                success: false, 
                message: "Bu o'quv markazi allaqachon mavjud!" 
            });
        }
        
        const newEdu = new Edu({ 
            city, 
            street, 
            center_name, 
            branch, 
            rating 
        });

        await newEdu.save();
        res.status(201).json({ success: true,message: "o'quvmarkaz qo'shildi", data: newEdu });
    } catch (error) {
        res.status(500).json({ success: false, message: `${error.message,"Serverda xatolik yuz berdi"}`});
    }
};

// -------------------- getEdu ------------------------------

const getEdus = async (req, res) => {
    try {
        const edus = await Edu.find();
        res.status(200).json({ success: true, message: "Barcha o'quvmarkazlar ro'yxati oligan", data: edus });
    } catch (error) {
        res.status(500).json({ success: false, message:error.message, });
    }
};

module.exports = { 
    postEdu, 
    getEdus, 
    getEduById, 
    updateEdu, 
    searchEdu, 
    deleteEdu
 };