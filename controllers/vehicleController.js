import asyncHandler from "express-async-handler";
import Vehicle from "../models/vehicleModal.js";

const addVehicle = asyncHandler(async (req, res) => {
  const {
    name,
    registerno,
    type,
    brand,
    model,
    price,
    ownership,
    transmission,
    gear,
    color,
    yom,
    fuel,
    fuelcap,
    power,
    mileage,
    noofdoors,
    noofseats,
    district,
    description,
    features,
    documents,
    image,
  } = req.body;

  const vehicleExists = await Vehicle.findOne({ registerno });

  if (vehicleExists) {
    res.status(400);
    throw new Error("Vehicle already exists");
  }

  const vehicle = await Vehicle.create({
    name,
    registerno,
    type,
    brand,
    model,
    price,
    ownership,
    transmission,
    gear,
    color,
    yom,
    fuel,
    fuelcap,
    power,
    mileage,
    noofdoors,
    noofseats,
    district,
    description,
    features,
    documents,
    image,
  });

  if (vehicle) {
    res.status(200).json({
      data: vehicle,
      message: "Vehicle added Sucessfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Vehicle Data");
  }
});

export { addVehicle };
