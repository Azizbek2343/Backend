const {Router} = require("express")
const eduRoute = Router();

const { postEdu, getEdus, getEduById, updateEdu, searchEdu, deleteEdu } = require("../controllers/edu.controller");
const { postLogin } = require("../controllers/users.controller");
    
eduRoute.post("/add", postEdu);
eduRoute.get("/all", getEdus);
eduRoute.get("/getEdu/:id", getEduById);
eduRoute.put("/updateEdu/:id", updateEdu);
eduRoute.get("/searchEdu", searchEdu);
eduRoute.delete("/deleteEdu/:id", deleteEdu);


module.exports = {eduRoute};