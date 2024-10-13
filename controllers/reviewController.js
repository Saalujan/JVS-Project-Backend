import asyncHandler from "express-async-handler";
import Review from "../models/reviewModal.js";
import Customer from "../models/customerModal.js";
import Vehicle from "../models/vehicleModal.js";

const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate({ path: "customerId", model: "Customer" })
      .populate({ path: "vehicleId", model: "Vehicle" });
    if (reviews.length === 0) {
      return res.status(404).json({ message: "Reviews Details is Empty !" });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Failed to fetch Sales from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

const addReview = asyncHandler(async (req, res) => {
  const { registerno, status, review, ratings } = req.body;

  const _id = req.customer._id;
  console.log(_id,"idddd");

  const customer = await Customer.findOne({ _id });
  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  const vehicle = await Vehicle.findOne({ registerno });

  if (!vehicle) {
    res.status(404);
    throw new Error("Vehicle not found");
  }
  

  const reviews = await Review.create({
    review,
    customerId: customer._id,
    vehicleId: vehicle._id,
    status,
    ratings,
  });

  if (reviews) {
    res.status(200).json({
      message: "Reviews added Sucessfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Sales Data");
  }
});


const deleteReview = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
        return res.status(404).json({ message: "review not Found !" });
      }
      res.status(200).json({ message: "Review Deleted Successfully !" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export { getAllReviews ,addReview ,deleteReview };
