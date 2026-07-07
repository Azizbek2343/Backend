const express = require("express");
const { connect, model, Schema } = require("mongoose"); 
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
async function connectToDB() {  
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL .env faylida aniqlanmagan!");
        }
        await connect(process.env.MONGO_URL);
        console.log("MongoDB is connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}
connectToDB();

const StudentSchema = new Schema({
    name: String,
    age: Number,
    course: String
});

const Student = model("Student", StudentSchema);

// 2. MA'LUMOT QO'SHISH UCHUN POST MARSHRUTI (Universal: Bitta yoki ko'p)
app.post("/add-student", async (req, res) => {
    try {
        const newStudents = await Student.insertMany(req.body); 
        
        res.status(201).json({ 
            success: true,
            message: "Talaba(lar) bazaga muvaffaqiyatli qo'shildi!", 
            data: newStudents 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


app.get("/get-students", async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json({
            success: true,
            message: "Barcha talabalar ro'yxati olingan.",
            data: students
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


app.delete("/delete-student/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.body.id || req.params.id);
        
        if (!deletedStudent) {
            return res.status(404).json({ success: false, message: "Talaba topilmadi!" });
        }
        
        res.status(200).json({ 
            success: true, 
            message: "Talaba muvaffaqiyatli o'chirildi!", 
            data: deletedStudent 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Routes
const {users} = require("./routes/userRoute");
const {eduRoute} = require("./routes/eduRoute"); 
const {houseRoute} = require("./routes/houseRoute"); 
const {carRoute} = require("./routes/carRoute"); 


app.use("/user", users);
app.use("/edu", eduRoute);
app.use("/house", houseRoute); 
app.use("/car", carRoute); 

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("joi");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
            description: "API documents using Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-dosc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));