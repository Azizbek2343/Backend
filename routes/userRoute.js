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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Yangi foydalanuvchini ro'yxatdan o'tkazish
 *     tags: [Users]
 *     description: Yangi foydalanuvchini yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Foydalanuvchining yagona username
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi akkaunti uchun parol
 *               firstname:
 *                 type: string
 *                 description: Foydalanuvchining ismi
 *               lastname:
 *                 type: string
 *                 description: Foydalanuvchining familiyasi
 *               birthday:
 *                 type: string
 *                 description: Foydalanuvchining tug'ilgan kuni (YYYY-MM-DD formatda)
 *               gender:
 *                 type: string
 *                 description: Foydalanuvchining jinsi
 *               address:
 *                 type: string
 *                 description: Foydalanuvchining manzili
 *               phone:
 *                 type: string
 *                 description: Foydalanuvchining telefon raqami
 *               car_id:
 *                 type: string
 *                 description: Foydalanuvchining avtomobil uchun ma'lumot (ObjectId)
 *               house_id:
 *                 type: string
 *                 description: Foydalanuvchining uyi uchun ma'lumot (ObjectId)
 *               edu_id:
 *                 type: string
 *                 description: Foydalanuvchining ta'limi uchun ma'lumot (ObjectId)
 *     responses:
 *       '201':
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */

users.post("/register", validationSchema(registerValidationSchema), postRegister);


users.post("/login", postLogin);

/** 
 * @swagger
 * /users/getUsers:
 *   get:
 *     summary: barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     description: Barcha foydalanuvchilar ro'yxatini olish
 *     responses: 
 *       '200':
 *         description: Foydalanuvchilar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
users.get("/getUsers", getUsers)
users.get("/getUserById/:id", getUserById)
users.get("/searchUser", searchUser)
users.put("/updateUser/:id", validationSchema(updateUserValidationSchema), updateUser)
users.delete("/deleteUser/:id", deleteUser)


module.exports = {users};