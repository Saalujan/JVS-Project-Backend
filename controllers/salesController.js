import asyncHandler from "express-async-handler";
import Customer from "../models/customerModal.js";
import Vehicle from "../models/vehicleModal.js";
import Sales from "../models/saleModel.js";

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

  if (vehicle.status === "Sold") {
    res.status(400).json({ message: "This vehicle is already sold" });
    return;
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

const deleteSales = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await Sales.findByIdAndDelete(id);
    if (!sales) {
      return res.status(404).json({ message: "Sales not Found !" });
    }
    res.status(200).json({ message: "Sales Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const updateSales = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sales = await Sales.findById(id);

  if (sales) {
    sales.price = req.body.price || sales.price;
    sales.description = req.body.description || sales.description;
    sales.status = req.body.status || sales.status;
    sales.documents = req.body.documents || sales.documents;
    const updatedSales = await sales.save();
    res.status(200).json(updatedSales);
  } else {
    res.status(404);
    throw new Error("Sales not found");
  }
});

export { addSales, getAllSales, deleteSales,updateSales };
