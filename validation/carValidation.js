const Joi = require("joi");

const carValidationSchema = Joi.object({
    brand: Joi.string().trim().required(),
    model: Joi.string().trim().required(),
    plate_number: Joi.string().required().min(3).max(6).pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(_+{}\[\]:;<>,.?~\\/-]).{8,}$/
    ),
    color: Joi.string().trim,
    passenger_capacity: Joi.string().min(2).max(8).required(),
});

const updateCarValidationSchema = Joi.object({
    brand: Joi.string().trim().optional(),
    model: Joi.string().trim().optional(),
    plate_number: Joi.string().min(3).max(6).pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(_+{}\[\]:;<>,.?~\\/-]).{8,}$/
    ),
    color: Joi.string().trim().optional(),
    passenger_capacity: Joi.string().min(2).max(8),
});

module.exports = {
    carValidationSchema,
    updateCarValidationSchema,
}