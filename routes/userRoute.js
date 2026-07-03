const {Router} = require("express")
const users = Router()

const { postRegister, getUsers, getUserById, updateUser, searchUser, deleteUser, postLogin } = require("../controllers/users.controller")

const validationSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    registerValidationSchema,
    updateUserValidationSchema,
} = require("../validation/usersValidation.js")

users.post("/register", validationSchema(registerValidationSchema), postRegister);
users.post("/login", postLogin);
users.get("/getUsers", getUsers)
users.get("/getUserById/:id", getUserById)
users.get("/searchUser", searchUser)
users.put("/updateUser/:id", validationSchema(updateUserValidationSchema), updateUser)
users.delete("/deleteUser/:id", deleteUser)


module.exports = {users};