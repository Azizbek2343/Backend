const { Router } = require("express");
const houseRoute = Router();

const { 
    postHouse, 
    getHouses, 
    getHouseById, 
    updateHouse, 
    searchHouse, 
    deleteHouse 
} = require("../controllers/house.controller"); 

houseRoute.post("/add", postHouse);
houseRoute.get("/all", getHouses);
houseRoute.get("/getHouse/:id", getHouseById);
houseRoute.put("/updateHouse/:id", updateHouse);
houseRoute.get("/searchHouse", searchHouse);
houseRoute.delete("/deleteHouse/:id", deleteHouse);

module.exports = { houseRoute };