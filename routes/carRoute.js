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
    
carRoute.post("/add", validationSchema(carValidationSchema), postCar);
carRoute.get("/all", getCars);
carRoute.get("/getCar/:id", getCarById);
carRoute.put("/updateCar/:id", validationSchema(updateCarValidationSchema), updateCar);
carRoute.get("/searchCar", searchCar);
carRoute.delete("/deleteCar/:id", deleteCar);


module.exports = {carRoute};