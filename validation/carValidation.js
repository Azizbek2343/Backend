const Joi = require("joi");

const carValidationSchema = Joi.object({
    brand: Joi.string().trim().required(),
    model: Joi.string().trim().required(),
    plate_number: Joi.string().required().min(3).max(6),
    color: Joi.string().trim(),
    passenger_capacity: Joi.string().min(1).max(6).required(),
});

const updateCarValidationSchema = Joi.object({
    brand: Joi.string().trim().optional(),
    model: Joi.string().trim().optional(),
    plate_number: Joi.string().min(3).max(6),
    color: Joi.string().optional(),
    passenger_capacity: Joi.string().min(1).max(6),
});

module.exports = {
    carValidationSchema,
    updateCarValidationSchema,
}