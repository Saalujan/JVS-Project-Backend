import asyncHandler from "express-async-handler";
import Vehicle from "../models/vehicleModal.js";
import Customer from "../models/customerModal.js";
import { sendVehicleAddEmail } from "../utils/customerMail.js";


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
    status,
    customerId,
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
    status,
    customerId,
  });

  if (vehicle) {
    const customer = await Customer.findById(customerId);
    if (customer) {
      await sendVehicleAddEmail(customer.email, customer.fname, vehicle);
    }
    res.status(200).json({
      data: vehicle,
      message: "Vehicle added Sucessfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Vehicle Data");
  }
});

const getAllVehciles = asyncHandler(async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    if (vehicles.length === 0) {
      return res.status(404).json({ message: "Vehicle is Empty !" });
    }
    res.status(200).json(vehicles);
  } catch (err) {
    console.error("Failed to fetch Vehciles from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

const vehicleDetail = asyncHandler(async (req, res) => {
  try {
    let _id = req.params.id;
    const vehicle = await Vehicle.findById(_id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle Not Found !" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteVehicle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not Found !" });
    }
    res.status(200).json({ message: "Vehicle Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateVehicle = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const vehicle = await Vehicle.findById(_id);

  if (!vehicle) {
    res.status(404);
    throw new Error("Vehicle not found");
  }

  const originalVehicleData = { ...vehicle.toObject() };

  const updateFields = [
    "name",
    "registerno",
    "type",
    "brand",
    "model",
    "price",
    "ownership",
    "transmission",
    "gear",
    "color",
    "yom",
    "fuel",
    "fuelcap",
    "power",
    "mileage",
    "noofdoors",
    "noofseats",
    "district",
    "description",
    "features",
    "documents",
    "image",
    "status",
  ];

  updateFields.forEach((field) => {
    vehicle[field] = req.body[field] || vehicle[field];
  });

  const isVehicleDataChanged = updateFields.some(
    (key) => vehicle[key] !== originalVehicleData[key]
  );
  if (isVehicleDataChanged) {
    const updatedVehicle = await vehicle.save();
    res.json({
      data: { ...updatedVehicle.toObject() },
      message: "Vehicle Updated Successfully",
    });
  } else {
    res.status(201).json({
      message: "No changes made",
    });
  }
});



export {
  addVehicle,
  getAllVehciles,
  vehicleDetail,
  deleteVehicle,
  updateVehicle,
};
