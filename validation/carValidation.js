const Joi = require("joi");

const carValidationSchema = Joi.object({
    title: Joi.string().trim().required(),
    model: Joi.string().trim().required(),
    description: Joi.string().trim().required().min(3).max(400),
    color: Joi.string().trim(),
    horsePower: Joi.string().trim().required(),
    carType: Joi.string().trim().required(),
    charging: Joi.string().trim().required(),
    weight: Joi.number().required().min(500).max(2000),
    gasoline: Joi.string().trim().required(),
    yearMachine: Joi.string().trim().required(),
    price: Joi.number().required(),
    plate_number: Joi.string().required().min(3).max(6),
    passenger_capacity: Joi.number().min(1).max(6).required(),
});

const updateCarValidationSchema = Joi.object({
    title: Joi.string().trim().optional(),
    model: Joi.string().trim().optional(),
    description: Joi.string().trim().optional().min(3).max(400),
    color: Joi.string().trim().optional(),
    horsePower: Joi.string().trim().optional().min(1).max(999),
    carType: Joi.string().trim().optional(),
    charging: Joi.string().trim().optional(),
    weight: Joi.number().optional().min(500).max(2000),
    gasoline: Joi.string().trim().optional(),
    yearMachine: Joi.string().trim().optional(),
    price: Joi.number().optional(),
    plate_number: Joi.string().min(3).max(6),
    passenger_capacity: Joi.number().optional().min(1).max(6),
});

module.exports = {
    carValidationSchema,
    updateCarValidationSchema,
}