const {Router} = require("express")
const eduRoute = Router();

const { postEdu, getEdus, getEduById, updateEdu, searchEdu, deleteEdu } = require("../controllers/edu.controller");
    
eduRoute.post("/add", postEdu);
eduRoute.get("/all", getEdus);
eduRoute.get("/getEdu/:id", getEduById);
eduRoute.get("/updateEdu/:id", updateEdu);
eduRoute.get("/searchEdu", searchEdu);
eduRoute.get("/deleteEdu", deleteEdu);


module.exports = {eduRoute};