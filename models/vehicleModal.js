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
  type:{
    type: String,
    required: true,
  },
  brand:{
    type: String,
    required: true,
  },
  model:{
    type: String,
    required: false,
  },
  price:{
    type: Number,
    required: true,
  }

});
