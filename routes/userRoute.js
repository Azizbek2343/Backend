const {Router} = require("express")
const users = Router()

const { postRegister, getUsers ,  getUserById, updateUser, searchUser, deleteUser, postLogin} = require("../controllers/users.controller")

users.post("/register", postRegister);
users.get("/getUsers", getUsers)
users.get("/getUser/:id", getUserById)
users.put("/updateUser/:id", updateUser)
users.get("/searchUser", searchUser)
users.delete("/deleteUser/:id", deleteUser)
users.post("/login", postLogin);



module.exports = {users};

