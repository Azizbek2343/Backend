const Joi = require("joi");

const registerValidationSchema = Joi.object({
    username: Joi.string().required().trim().min(3).max(30),
    password: Joi.string()
    .required()
    .min(8)
    .max(30)
    .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(_+{}\[\]:;<>,.?~\\/-]).{8,}$/
    ),
    firstname: Joi.string(),
    lastname: Joi.string(),
    birthday: Joi.string().optional(),
    jinsi: Joi.string().optional(),
    address: Joi.string(),
    phone: Joi.string().pattern(/^\+998\d{9}$/),
    car_id: Joi.string().optional(),
    edu_id: Joi.string().optional(),
    house_id: Joi.string().optional(),
});

const updateUserValidationSchema = Joi.object({
    username: Joi.string().trim().min(3).max(50).optional(),
    password: Joi.string()
    .optional()
    .min(8)
    .max(30)
    .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(_+{}\[\]:;<>,.?~\\/-]).{8,}$/
    ),
    firstname: Joi.string().trim().optional(),
    lastname: Joi.string().optional(),
    address: Joi.string().optional(),
    phone: Joi.string().pattern(/^\+998\d{9}$/).optional(),
    car_id: Joi.string().optional(),
    edu_id: Joi.string().optional(),
    house_id: Joi.string().optional(),
});

module.exports = {
    registerValidationSchema,
    updateUserValidationSchema,
};