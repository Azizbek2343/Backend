const Joi = require("joi");

const eduCenterValidationSchema = Joi.object({
    city: Joi.string().required().trim(),
    street: Joi.string().optional().trim(),
    center_name: Joi.string().required().trim(),
    branch: Joi.string().trim(),
    rating: Joi.string().required().min(1).max(5),
});

const updateEduValidationSchema = Joi.object({
    city: Joi.string().trim().optional(),
    center_name: Joi.string().trim().optional(),
    rating: Joi.string().optional().min(1).max(5),
})

module.exports = {
    eduCenterValidationSchema,
    updateEduValidationSchema,
}