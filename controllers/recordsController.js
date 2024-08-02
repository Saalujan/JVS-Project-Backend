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
const getAllRecordsByID = asyncHandler(async (req, res) => {
  try {
    let _id = req.params.id;

    const records = await Records.findById(_id).populate("vehicleId");

    if (!records) {
      return res.status(404).json({ message: "No records found." });
    }

    res.status(200).json(records);
  } catch (err) {
    console.error("Failed to fetch records by customer ID from MongoDB:", err);
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

const updateRecordHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, details, documents } = req.body;

  const record = await Records.findById(id);

  if (record) {
    record.recordhistory.push({
      content: content || "",
      details: details || "",
      documents: documents || [],
    });

    const updatedRecord = await record.save();
    res.status(200).json({
      data: updatedRecord,
      message: "Record history updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Record not found");
  }
});

const deleteRecord = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Records.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({ message: "Records not Found !" });
    }
    res.status(200).json({ message: "Records Detail Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteRecordsHistory = asyncHandler(async (req, res) => {
  try {
    const { recordId, historyId } = req.params;

    const record = await Records.findById(recordId);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    const historyIndex = record.recordhistory.findIndex(
      (bid) => bid._id.toString() === historyId
    );
    if (historyIndex === -1) {
      return res.status(404).json({ message: "Bid not found" });
    }

    record.recordhistory.splice(historyIndex, 1);

    await record.save();

    res.status(200).json({ message: "Record removed successfully" });
  } catch (error) {
    console.error("Failed to delete Record", error);
    res.status(500).json({ message: error.message });
  }
});
export {
  getAllRecords,
  getRecordByCustomerID,
  getAllRecordsByID,
  updateRecordHistory,
  deleteRecord,
  deleteRecordsHistory,
};
