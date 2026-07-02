const {Router} = require("express")
const carRoute = Router();

const { postCar, getCars, getCarById, updateCar, searchCar, deleteCar } = require("../controllers/car.controller");
const { postLogin } = require("../controllers/users.controller");
    
carRoute.post("/add", postCar);
carRoute.get("/all", getCars);
carRoute.get("/getCar/:id", getCarById);
carRoute.put("/updateCar/:id", updateCar);
carRoute.get("/searchCar", searchCar);
carRoute.delete("/deleteCar/:id", deleteCar);


module.exports = {carRoute};