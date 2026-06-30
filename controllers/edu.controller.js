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

// ------------------- getEduById ---------------------------
const getEduById = async (req,res) => {
    try{
        const eduId = req.params.id
        
        const edu = await Edu.findById(eduId)
        if(!edu){
            return res.status(404).json({message: "O'quvmarkazlar mavjud emas"})
        }
        res.json({message: "O'quvmarkaz", edu})
    }catch(err){
        console.error(err);
        res.status(500).json({message: "serverda xatolik yuz berdi"})
    }
}

// ----------------------update edu --------------------------
const updateEdu = async (req,res)=> {
    try{
        const {id} = req.params
        const {city, center_name, street, branch,rating} = req.body

        const updateEdu = await Edu.findByIdAndUpdate(
            id,
         {city, center_name, street, branch,rating},
         {new: true}            
        )
        if(!updateEdu){
            return res.status(404).json({
                success: false,
                message: "o'quvmarkaz mavjud emas"
            })
        }
        res.json({
            success: true,
            message: "O'quvmarkaz muvaffaqiyatli tahrirlandi",
            edu:updateEdu,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "serverfa xatolik yuz berdi",
            error: err.message
        })
    }
}

// ---------------------- search edu ------------------------
const searchEdu = async (req,res) => {
    try{
        const {query} = req.query

        if(!query || typeof query !== "string") {
            return res.status(404).json({message: "xato qidirish"})
        }

        const result =await Edu.find({
            $or:[
                {city: {$regex: query, $options: "i"}},
                {street: {$regex: query, $options: "i"}},   
                {center_name: {$regex: query, $options: "i"}},
                {branch: {$regex: query, $options: "i"}},
                // {rating: {$regex: query, $options: "i"}},
            ],
        });

        if (result.length === 0) {
            return res.json({message: "Bunday o'quvmarkaz topilmadi"})
        }

        res.json(result)
    }catch(err){
        console.error("O'quvmarkazlarni qidirishda xatolik", err);
        res.status(500).json({message: "Serverda xatolik: o'quvmarkazlarni qidirish muvaffaqiyatsz!"})
    }
} 

// ----------------------- delete edu ---------------------------------------
const deleteEdu = async (req,res) => {
    try{
        const deleteEdu = await Edu.findByIdAndDelete(req.params.id || req.body.id)
        if(!deleteEdu) {
            return res.status(404).json({
                success: false, 
                message: "O'quvarkaz topilmadi"
            })
        }

        return res.status(200).json({
            success: true,
            message: "O'quvmarkaz muvaffaqiyatli o'chirildi",
            data: deleteEdu
        })
    }catch(err){
        return res.status(500).json({success: false, message: err.message})
    }
}

module.exports = { 
    postEdu, 
    getEdus, 
    getEduById, 
    updateEdu, 
    searchEdu, 
    deleteEdu
 };