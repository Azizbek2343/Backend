const {Router} = require("express")
const carRoute = Router();

const { postCar, getCars, getCarById, updateCar, searchCar, deleteCar } = require("../controllers/car.controller");
const { postLogin } = require("../controllers/users.controller");

const validationSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    carValidationSchema,
    updateCarValidationSchema,
} = require("../validation/carValidation.js")



/** 
 * @swagger
 * tags:
 *   name: Car
 *   description: Mashinalarni boshqarish uchun API endpointlari
 */

/** 
 * @swagger
 * /car/add:
 *   post:
 *     summary: Yangi mashinani ro'yxatdan o'tkazish
 *     tags: [Car]
 *     description: Yangi mashina ma'lumotlarini yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Mashina brendi
 *               model:
 *                 type: string
 *                 description: Mashina modeli
 *               description:
 *                 type: string
 *                 description: Mashina haqida ma'lumot
 *               color:
 *                 type: string
 *                 description: Mashina rangi
 *               horsePower:
 *                 type: string
 *                 description: Mashina ot kuchi
 *               carType:
 *                 type: string
 *                 description: Mashina turi
 *               charging: 
 *                 type: string
 *                 description: Mashina quvatlagichi
 *               weight:
 *                 type: number
 *                 description: Mashina uzunligi
 *               gasoline:
 *                 type: string
 *                 description: Mashina benzin turi
 *               yearMachine:
 *                 type: string
 *                 description: Mashina yili
 *               price:
 *                 type: string
 *                 description: Mashina narxi
 *               plate_number:
 *                 type: string
 *                 description: Mashina davlat raqami
 *               passenger_capacity:
 *                 type: number
 *                 description: Mashina sig'imi
 *     responses:
 *       '201':
 *         description: Mashina muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
carRoute.post("/add", validationSchema(carValidationSchema), postCar);



/** 
 * @swagger
 * /car/all:
 *   get:
 *     summary: Barcha mashinalarni olish
 *     tags: [Car]
 *     description: Barcha mashinalar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Mashinalar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
carRoute.get("/all", getCars);



/** 
 * @swagger
 * /car/getCar/{id}:
 *   get:
 *     summary: Mashina ID bo'yicha olish
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200: 
 *         description: Mashina muvaffaqiyatli qaytarildi
 *       404:
 *         description: Mashina topilmadi
 *       500:
 *         description: Server xatosi
 */
carRoute.get("/getCar/:id", getCarById);



/** 
 * @swagger
 * /car/searchCar:
 *   get:
 *     summary: Mashinani qidirish
 *     tags: [Car]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:  
 *           type: string
 *     responses:
 *       200: 
 *         description: Qidiruv natijalari qaytarildi
 *       404:
 *         description: Mashina topilmadi
 *       500:
 *         description: Server xatosi
 */
carRoute.get("/searchCar", searchCar);



/** 
 * @swagger
 * /car/updateCar/{id}:
 *   put:
 *     summary: Mashina ma'lumotlarini yangilash
 *     tags: [Car]
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
 *               title: 
 *                 type: string
 *               model:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               horsePower:
 *                 type: string
 *               carType:
 *                 type: string
 *               charging:
 *                 type: string
 *               weight:
 *                 type: number 
 *               gasoline:
 *                 type: string
 *               yearMachine:
 *                 type: string
 *               price: 
 *                 type: string
 *               plate_number:
 *                 type: string
 *               passenger_capacity:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mashina muvaffaqiyatli yangilandi
 *       404:
 *         description: Mashina topilmadi
 *       500:
 *         description: Server xatosi
 */
carRoute.put("/updateCar/:id", validationSchema(updateCarValidationSchema), updateCar);



/** 
 * @swagger
 * /car/deleteCar/{id}:
 *   delete:
 *     summary: Mashinani o'chirish
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mashina ma'lumotlari muvaffaqiyatli o'chirildi
 *       404:
 *         description: Mashina topilmadi
 *       500:
 *         description: Server xatosi
 */
carRoute.delete("/deleteCar/:id", deleteCar);


module.exports = {carRoute};