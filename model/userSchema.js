const { Schema, model } = require("mongoose");
const { Car } = require("./carSchema");
const { Edu } = require("./eduSchema"); 
const { House } = require("./houseSchema"); 


const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    birthday: { type: String },
    gender: { type: String, enum: ["male", "female"], alias: "jinsi" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    car_id: { type: Schema.Types.ObjectId, ref: Car },
    edu_id: { type: Schema.Types.ObjectId, ref: Edu },
    house_id: { type: Schema.Types.ObjectId, ref: House },

});

const User = model("user", userSchema);
module.exports = { User };