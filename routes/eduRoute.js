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
    
eduRoute.post("/add", validationSchema(eduCenterValidationSchema), postEdu);
eduRoute.get("/all", getEdus);
eduRoute.get("/getEdu/:id", getEduById);
eduRoute.put("/updateEdu/:id", validationSchema(updateEduValidationSchema), updateEdu);
eduRoute.get("/searchEdu", searchEdu);
eduRoute.delete("/deleteEdu/:id", deleteEdu);


module.exports = {eduRoute};