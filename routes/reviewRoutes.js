import express from "express";
import {
  addReview,
  deleteReview,
  getAllReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addreview", protect, addReview);
router.delete("/:id", protect, deleteReview);
router.route("/").get(getAllReviews);

export default router;
