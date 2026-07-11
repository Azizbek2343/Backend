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
 *     description: Yangi mashina malumotlarini yaratish
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
 *         description: Mashina muvaffaqiyatli topilmadi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
carRoute.post("/add", validationSchema(carValidationSchema), postCar);
carRoute.get("/all", getCars);
carRoute.get("/getCar/:id", getCarById);
carRoute.put("/updateCar/:id", validationSchema(updateCarValidationSchema), updateCar);
carRoute.get("/searchCar", searchCar);
carRoute.delete("/deleteCar/:id", deleteCar);


module.exports = {carRoute};