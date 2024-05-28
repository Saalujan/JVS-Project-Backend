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
  let _id = req.params.id;
  const vehicle = await Vehicle.findById(_id);
  if (vehicle) {
    const originalvehicleData = {
      name: vehicle.name,
      registerno: vehicle.registerno,
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      price: vehicle.price,
      ownership: vehicle.ownership,
      transmission: vehicle.transmission,
      gear: vehicle.gear,
      color: vehicle.color,
      yom: vehicle.yom,
      fuel: vehicle.fuel,
      fuelcap: vehicle.fuelcap,
      power: vehicle.power,
      mileage: vehicle.mileage,
      noofdoors: vehicle.noofdoors,
      noofseats: vehicle.noofseats,
      district: vehicle.district,
      description: vehicle.description,
      features: vehicle.features,
      documents: vehicle.documents,
      image: vehicle.image,
      status: vehicle.status,
    };

    vehicle.name = req.body.name || vehicle.name;
    vehicle.registerno = req.body.registerno || vehicle.registerno;
    vehicle.type = req.body.type || vehicle.type;
    vehicle.brand = req.body.brand || vehicle.brand;
    vehicle.model = req.body.model || vehicle.model;
    vehicle.price = req.body.price || vehicle.price;
    vehicle.ownership = req.body.ownership || vehicle.ownership;
    vehicle.transmission = req.body.transmission || vehicle.transmission;
    vehicle.gear = req.body.gear || vehicle.gear;
    vehicle.color = req.body.color || vehicle.color;
    vehicle.yom = req.body.yom || vehicle.yom;
    vehicle.fuel = req.body.fuel || vehicle.fuel;
    vehicle.fuelcap = req.body.fuelcap || vehicle.fuelcap;
    vehicle.power = req.body.power || vehicle.power;
    vehicle.mileage = req.body.mileage || vehicle.mileage;
    vehicle.noofdoors = req.body.noofdoors || vehicle.noofdoors;
    vehicle.noofseats = req.body.noofseats || vehicle.noofseats;
    vehicle.district = req.body.district || vehicle.district;
    vehicle.description = req.body.description || vehicle.description;
    vehicle.features = req.body.features || vehicle.features;
    vehicle.documents = req.body.documents || vehicle.documents;
    vehicle.image = req.body.image || vehicle.image;
    vehicle.status = req.body.status || vehicle.status;

    const isvehicleDataChanged = Object.keys(originalvehicleData).some(
      (key) => vehicle[key] !== originalvehicleData[key]
    );

    if (isvehicleDataChanged) {
      const updatedvehicle = await vehicle.save();

      res.json({
        data: {
          _id:updatedvehicle._id,
          name: updatedvehicle.name,
          registerno: updatedvehicle.registerno,
          type: updatedvehicle.type,
          brand: updatedvehicle.brand,
          model: updatedvehicle.model,
          price: updatedvehicle.price,
          ownership: updatedvehicle.ownership,
          transmission: updatedvehicle.transmission,
          gear: updatedvehicle.gear,
          color: updatedvehicle.color,
          yom: updatedvehicle.yom,
          fuel: updatedvehicle.fuel,
          fuelcap: updatedvehicle.fuelcap,
          power: updatedvehicle.power,
          mileage: updatedvehicle.mileage,
          noofdoors: updatedvehicle.noofdoors,
          noofseats: updatedvehicle.noofseats,
          district: updatedvehicle.district,
          description: updatedvehicle.description,
          features: updatedvehicle.features,
          documents: updatedvehicle.documents,
          image: updatedvehicle.image,
          status: updatedvehicle.status,
        },
        message: "Vehicle Updated Succesfully",
      });
    } else {
      return res.status(201).json({
        message: "No changes made",
      });
    }
  } else {
    res.status(404);
    throw new Error("customer not found");
  }
});

export { addVehicle, getAllVehciles, vehicleDetail, deleteVehicle,updateVehicle };
