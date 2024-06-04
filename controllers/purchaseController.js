import asyncHandler from "express-async-handler";
import Purchase from "../models/purchaseNotificanModel.js";
import Customer from "../models/customerModal.js";
import { sendRequestConfirmEmail } from "../utils/customerMail.js";

const addPurchase = asyncHandler(async (req, res) => {
  const { customerId, vehicleId, status } = req.body;

  const purchase = await Purchase.create({
    customerId,
    vehicleId,
    status,
  });

  if (purchase) {
    const customer = await Customer.findById(customerId);
    if (customer) {
      await sendRequestConfirmEmail(customer.email, customer.fname);
    }
    res.status(200).json({
      data: purchase,
      message: "Request Send SuccessFully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Data");
  }
});

const getAllPurchase = asyncHandler(async (req, res) => {
  try {
    const purchase = await Purchase.find({});
    if (purchase.length === 0) {
      return res.status(404).json({ message: "Purchase Details is Empty !" });
    }
    res.status(200).json(purchase);
  } catch (err) {
    console.error("Failed to fetch purchase from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

const deletePurchase = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByIdAndDelete(id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not Found !" });
    }
    res.status(200).json({ message: "Request Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { addPurchase, getAllPurchase,deletePurchase };
