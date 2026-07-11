const { Router } = require("express");
const houseRoute = Router();

const { postHouse, getHouses, getHouseById, updateHouse, searchHouse, deleteHouse } = require("../controllers/house.controller"); 

const validationSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    houseValidationSchema,
    updateHouseValidationSchema,
} = require("../validation/houseValidation.js")

/** 
 * @swagger
 * tags:
 *   name: House
 *   description: Uylarni boshqarish uchun API endpointlari
 */

/** 
 * @swagger
 * /house/add:
 *   post:
 *     summary: Yangi uyni ro'yxatdan o'takzish
 *     tags: [House]
 *     description: Yangi uyni yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               region:
 *                 type: string
 *                 description: Uyingiz joylashgan hudud
 *               city: 
 *                 type: string
 *                 description: Uyingiz joylashgan shahar
 *               house_number:
 *                 type: string
 *                 description: Uyingizni raqami
 *               street:
 *                 type: string
 *                 description: Ko'changiz nomi
 *               family_members:
 *                 type: string
 *                 description: Oila a'zolaringiz soni
 *               location: 
 *                 type: string
 *                 description: Uyingizni joylashuvi
 *     responses:
 *       '201': 
 *         description: Uy muvaffaqiyatli qo'shildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Server xatosi 
 */
houseRoute.post("/add", validationSchema(houseValidationSchema), postHouse);



/** 
 * @swagger
 * /house/all:
 *   get:
 *     summary: barcha uylarni olish
 *     tags: [House]
 *     description: Barcha uylarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Uylar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
houseRoute.get("/all", getHouses);



/** 
 * @swagger
 * /house/getHouse/{id}:
 *   get:
 *     summary: Uyni ID bo'yicha olish
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Uy muvaffaqiyatli qaytarildi
 *       404: 
 *         description: Uy topilmadi
 *       500:
 *         description: Server xatosi
 */
houseRoute.get("/getHouse/:id", getHouseById);



/** 
 * @swagger
 * /house/searchHouse:
 *   get:
 *     summary: Uylarni qidirish
 *     tags: [House]
 *     parameters:
 *        - in: query
 *          name: query
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari qaytarildi
 *       404:
 *         description: Uy topilmadi
 *       500:
 *         description: Server xatosi
 */
houseRoute.get("/searchHouse", searchHouse);



/** 
 * @swagger
 * /house/updateHouse/{id}:
 *   put:
 *     summary: Uyni malumotlarini yangilash
 *     tags: [House]
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
 *               region:
 *                 type: string
 *               city:
 *                 type: string
 *               house_number:
 *                 type: string
 *               street:
 *                 type: string
 *               family_members:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:  
 *       200: 
 *         description: Uy muvaffqiyatli yangilandi
 *       404:
 *         description: Uy topilmadi
 *       500:
 *         description: Server xatosi
 */
houseRoute.put("/updateHouse/:id", validationSchema(updateHouseValidationSchema), updateHouse);



/** 
 * @swagger
 * /house/deleteHouse/{id}:
 *   delete:
 *     summary: Uyni ma'lumotlarini o'chirish
 *     tags: [House]
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: uy ma'lumotlari muvaffaqiyatli o'chirildi
 *       404: 
 *         description: Uy topilmadi
 *       500:
 *         description: Server xatosi
 */
houseRoute.delete("/deleteHouse/:id", deleteHouse);

module.exports = { houseRoute };