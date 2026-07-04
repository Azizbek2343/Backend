const Joi = require("joi");

const houseValidationSchema = Joi.object({
    region: Joi.string().trim(),
    city: Joi.string().trim().required(),
    house_number: Joi.string().required().min(1).max(999),
    street: Joi.string().trim().required(),
    family_members: Joi.string().min(2).max(25),
    location: Joi.string().trim(),
});

const updateHouseValidationSchema = Joi.object({
    region: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    house_number: Joi.string().optional().min(1).max(999),
    street: Joi.string().trim().optional(),
    family_members: Joi.string().min(2).max(25).optional,
})

module.exports = {
    houseValidationSchema,
    updateHouseValidationSchema,
}