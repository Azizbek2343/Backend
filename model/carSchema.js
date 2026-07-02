const { Schema, model } = require("mongoose");

const carSchema = new Schema({
    brand: { type: String, required: true },      
    model: { type: String, required: true },      
    plate_number: { type: String, required: true },
    color: { type: String, required: true },       
    passenger_capacity: { type: Number, required: true },
});

const Car = model("car", carSchema);
module.exports = { Car };