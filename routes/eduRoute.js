const {Router} = require("express")
const eduRoute = Router();

const { postEdu, getEdus, getEduById, updateEdu, searchEdu, deleteEdu } = require("../controllers/edu.controller");
const { postLogin } = require("../controllers/users.controller");

const validationSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    eduCenterValidationSchema,
    updateEduValidationSchema,
} = require("../validation/eduValidation.js")

/** 
 * @swagger
 * tags: 
 *   name: Edus
 *   description: O'quvmarkazlarni boshqarish uchun API endpointlari
 */

/** 
 * @swagger
 * /edu/add:
 *   post:
 *     summary: Yangi o'quvmarkazni ro'yxatdan o'tkazish
 *     tags: [Edus]
 *     description: Yangi o'quvmarkazni yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *                 description: O'quvmarkaz joylashgan shahar
 *               street: 
 *                 type: string
 *                 description: O'quvmarkaz ko'chasi
 *               center_name:
 *                 type: string
 *                 description: O'quvmarkaz nomi
 *               branch: 
 *                 type: string
 *                 description: O'quvmarkaz filiali
 *               rating:
 *                 type: number
 *                 description: O'quvmarkaz bali
 *     responses:
 *       '201':
 *         description: Oq'uvmarkaz muvaffaqiyatli topildi
 *       '400': 
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500': 
 *         description: Ichki server xatosi
 */
eduRoute.post("/add", validationSchema(eduCenterValidationSchema), postEdu);



/** 
 * @swagger
 * /edu/all:
 *   get:
 *     summary: barcha o'quv markazlarni olish
 *     tags: [Edus]
 *     description: Barcha o'quv markazlarni ro'yxatini olish
 *     responses:
 *       '200': 
 *         description: O'quvmarkazlar ro'yxati muvaffqiyatli qaytarildi
 *       '500': 
 *         description: Ichki server xatosi
 */
eduRoute.get("/all", getEdus);



/** 
 * @swagger
 * /edu/getEdu/{id}:
 *   get:
 *     summary: O'quvmarkaz ID bo'yicha olish
 *     tags: [Edus]
 *     parameters: 
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *     responses:
 *       200: 
 *         description: O'quvmarkaz muvaffaiqyatli qaytarildi 
 *       404:
 *         description: Oq'uvmarkaz topilmadi
 *       500: 
 *         description: Server xatosi
 */
eduRoute.get("/getEdu/:id", getEduById);



/** 
 * @swagger
 * /edu/searchEdu:
 *  get:
 *    summary: O'quvmarkazlarni qidirish
 *    tags: [Edus]
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
 *        description: O'quvmarkaz topilmadi
 *      500: 
 *        description: Server xatosi
 */
eduRoute.get("/searchEdu", searchEdu);



/** 
 * @swagger
 * /edu/updateEdu/{id}:
 *   put:
 *     summary: O'quvmarkazni yangilash
 *     tags: [Edus]
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
 *               city:
 *                 type: string
 *               street:
 *                 type: string
 *               center_name:
 *                 type: string
 *               branch:
 *                 type: string
 *               rating: 
 *                 type: string
 *     responses:
 *       200:
 *         description: O'quvmarkaz muvaffaqiyatli yangilandi   
 *       404:
 *         description: O'quvmarkaz topilmadi
 *       500: 
 *         description: Server xatosi
 */
eduRoute.put("/updateEdu/:id", validationSchema(updateEduValidationSchema), updateEdu);



/** 
 * @swagger
 * /edu/deleteEdu/{id}:
 *   delete: 
 *     summary: O'quvmarkazni o'chirish
 *     tags: [Edus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: O'quvmarkaz muvaffaqiyatli o'chirildi
 *       404:  
 *         description: O'quvmarkaz topilmadi
 *       500: 
 *         description: Server xatosi
 */
eduRoute.delete("/deleteEdu/:id", deleteEdu);


module.exports = {eduRoute};