import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  registerno: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  ownership: {
    type: Number,
    required: false,
  },
  transmission: {
    type: String,
    required: false,
  },
  gear: {
    type: Number,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  yom: {
    type: Number,
    required: false,
  },
  fuel: {
    type: String,
    required: false,
  },
  fuelcap: {
    type: Number,
    required: false,
  },
  power: {
    type: Number,
    required: false,
  },
  mileage: {
    type: Number,
    required: false,
  },
  noofdoors: {
    type: Number,
    required: false,
  },
  noofseats: {
    type: Number,
    required: false,
  },
  district: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  features: {
    type: [String],
    required: false,
  },
  documents: {
    type: String,
    required: false,
  },
  image: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    default: "Requested",
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
