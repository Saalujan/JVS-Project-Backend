import asyncHandler from "express-async-handler";
import Records from "../models/recordsModel.js";

const getAllRecords = asyncHandler(async (req, res) => {
  try {
    const records = await Records.find({});
    if (records.length === 0) {
      return res.status(404).json({ message: "Records Details is Empty !" });
    }
    res.status(200).json(records);
  } catch (err) {
    console.error("Failed to fetch Sales from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

const getRecordByCustomerID = asyncHandler(async (req, res) => {
  try {
    const { customerId } = req.params;

    const records = await Records.find({ customerId }).populate("vehicleId");

    if (!records || records.length === 0) {
      return res
        .status(404)
        .json({ message: "No records found for this customer." });
    }

    res.status(200).json(records);
  } catch (err) {
    console.error("Failed to fetch records by customer ID from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

export { getAllRecords, getRecordByCustomerID };
