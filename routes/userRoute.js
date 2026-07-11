const { Router } = require("express")
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
 * /user/register:
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



/** 
 * @swagger
 * /user/getUsers:
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

/** 
 * @swagger
 * /user/getUserById/{id}:
 *   get:
 *     summary: foydalanuvchi ID bo'yicha olish
 *     tags: [Users]
 *     parameters:
 *       - in: path 
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli qaytarildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
*/
users.get("/getUserById/:id", getUserById)

/** 
 * @swagger
 * /user/searchUser:
 *  get:
 *    summary: Foydalanuvchilarni qidirish
 *    tags: [Users]
 *    parameters: 
 *      - in: query
 *        name: query
 *        required: true
 *        schema: 
 *          type: string
 *    responses: 
 *      200:
 *        description: Qidiruv natijalari qaytarildi
 *      404:
 *        description: Foydalanuvhci topilmadi
 *      500: 
 *        description: Server xatosi
 */
users.get("/searchUser", searchUser)

/** 
 * @swagger
 * /user/updateUser/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname: 
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string 
 *               product_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi
 *       404: 
 *         description: Foydalanuvchi topilmadi
 *       500: 
 *         description: Server xatosi
 */
users.put("/updateUser/:id", validationSchema(updateUserValidationSchema), updateUser)

/** 
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaaqiyatli o'chirildi
 *       404:  
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
users.delete("/deleteUser/:id", deleteUser)

/** 
 * @swagger
 * /user/login:
 *    post:
 *     summary: Foydalanuvchini tizimga kirishi
 *     tags: [Users]
 *     description: Foydalanuvchini kiritilgan ma'lumotlar bilan tizimga kiritish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Foydalanuvchining elektron pochta manzili
 *               password:
 *                 type: string
 *                 description: Foydalanuvchining paroli
 *     responses:
 *       '200':
 *         description: Foydalanuvchi muvaffaqiyatli tizimga kirdi
 *       '401':
 *         description: Noto'g'ri ma'lumotlar
 *       '500':
 *         description: Ichki server xatosi
 */
users.post("/login", postLogin);


module.exports = { users }; 