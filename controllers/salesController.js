import asyncHandler from "express-async-handler";
import Customer from "../models/customerModal.js";
import Vehicle from "../models/vehicleModal.js";
import Sales from "../models/SalesModel.js";

const addSales = asyncHandler(async (req, res) => {
  const { price, email, registerno, status, description, documents } = req.body;

  const customer = await Customer.findOne({ email });
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  const vehicle = await Vehicle.findOne({ registerno });
  if (!vehicle) {
    res.status(404);
    throw new Error("Vehicle not found");
  }

  const sales = await Sales.create({
    price,
    customerId: customer._id,
    vehicleId: vehicle._id,
    status,
    description,
    documents,
  });

  if (sales) {
    res.status(200).json({
      data: sales,
      message: "Sales added Sucessfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Sales Data");
  }
});


const getAllSales = asyncHandler(async (req, res) => {
    try {
      const sales = await Sales.find({});
      if (sales.length === 0) {
        return res.status(404).json({ message: "Sales Details is Empty !" });
      }
      res.status(200).json(sales);
    } catch (err) {
      console.error("Failed to fetch Sales from MongoDB:", err);
      res.status(500).json({ message: err.message });
    }
  });


export {addSales,getAllSales};
