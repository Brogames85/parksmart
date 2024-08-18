const { mongoose } = require("mongoose");
const CarSchema = new mongoose.Schema({
  carNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  }
})

const Car = mongoose.model("Car", CarSchema);
module.exports = { Car };