const { Router } = require("express");
const houseRoute = Router();

const { postHouse, getHouses, getHouseById, updateHouse, searchHouse, deleteHouse } = require("../controllers/house.controller"); 

const validationSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

const {
    houseValidationSchema,
    updateHouseValidationSchema,
} = require("../validation/houseValidation.js")

houseRoute.post("/add", validationSchema(houseValidationSchema), postHouse);
houseRoute.get("/all", getHouses);
houseRoute.get("/getHouse/:id", getHouseById);
houseRoute.put("/updateHouse/:id", validationSchema(updateHouseValidationSchema), updateHouse);
houseRoute.get("/searchHouse", searchHouse);
houseRoute.delete("/deleteHouse/:id", deleteHouse);

module.exports = { houseRoute };