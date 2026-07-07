const { Schema, model } = require("mongoose");

const carSchema = new Schema({
    title: { type: String, required: true },      
    model: { type: String, required: true },   
    description: {type: String, required: true},
    color: { type: String, required: true },       
    horsePower: {type: String, required: true},   
    carType: {type: String, required: true},   
    charging: {type: String, required: true},   
    weight: {type: Number, required: true},   
    gasoline: {type: String, required: true},   
    yearMachine: {type: String, required: true},   
    price: {type: Number, required: true},   
    plate_number: { type: String, required: true },
    passenger_capacity: { type: Number, required: true },
});

const Car = model("car", carSchema);
module.exports = { Car };