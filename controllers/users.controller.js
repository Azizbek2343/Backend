const { User } = require("../model/userSchema");

// --------------------Register User---------------------
const postRegister = async (req , res ) => {
    try {
        const {
            username,
            password,
            firstname,
            lastname,
            birthday,
            jinsi,
            address,
            phone,
        } = req.body;
        
        const existingUser = await User.findOne({username});

        console.log(existingUser);

        if(existingUser){
            return res.status(400).json({
                success: false, 
                message: "Bu nom bilan ro'yxatdan o'tgan foydalanuvchi mavjud"
            });
        } else {
            const newUser = new User({
                username,
                password, 
                firstname,
                lastname,
                birthday,
                jinsi,
                address,
                phone,
            });
            
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "Ro'yxatdan o'tish muvafaqqiyatli yakunlandi",
            });
        }
    } catch (error) {
        console.error("Xato:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi.",
        });
    }
}

// --------------------Get Users---------------------
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      message: "Barcha foydalanuvchilar ro'yxati olingan.",
      innerData: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Foydalanuvchilarni olishda xato yuz berdi.",
    });
  }
}

//--------------------- getUserById ----------

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        res.json({message: "User found", user})
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Eror"})
    }
}

// -------------------------Update users--------------------
const updateUser = async (req,res) => {
    try{
        const {id} = req.params;
        const {username, lastname, phone, address, password,birthday,gender} = req.body;

        const updateUser = await User.findByIdAndUpdate(
            id,
            {username, lastname, phone,address,password,gender, birthday},
            {new: true}
        )
        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        res.json({
            success: true,
            message: "User updated successfully!",
            user:updateUser,
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}


// --------------------search user---------------------
const searchUser = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query." });
        }

        const result = await User.find({
            $or: [
                { firstname: { $regex: query, $options: "i" } },
                { lastname: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } },
                { birthday: { $regex: query, $options: "i" } },
                { phone: { $regex: query, $options: "i" } },
                { address: { $regex: query, $options: "i" } },
                { gender: { $regex: query, $options: "i" } },
            ],
        });

        if (result.length === 0) {
            return res.json({ message: "Bunday foydalanuvchi topilmadi" });
        }

        res.json(result);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error: Failed to fetch users." });
    }
};


// --------------------delete user---------------------
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id || req.body.id);
        
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi!" });
        }
        
        return res.status(200).json({ 
            success: true, 
            message: "Foydalanuvchi muvaffaqiyatli o'chirildi!", 
            data: deletedUser 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    postRegister,
    getUsers ,
    getUserById,
    updateUser,
    searchUser,
    deleteUser,
}