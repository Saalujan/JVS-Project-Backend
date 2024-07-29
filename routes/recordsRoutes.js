import express from "express";
import {
  getAllRecords,
  getRecordByCustomerID,
} from "../controllers/recordsController.js";

const router = express.Router();

router.route("/").get(getAllRecords);
router.route("/:customerId").get(getRecordByCustomerID);

export default router;
