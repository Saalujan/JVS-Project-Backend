import express from "express";
import {
  deleteRecord,
  getAllRecords,
  getAllRecordsByID,
  getRecordByCustomerID,
  updateRecordHistory,
} from "../controllers/recordsController.js";

const router = express.Router();

router.route("/").get(getAllRecords);
router.route("/customer/:customerId").get(getRecordByCustomerID);
router.route("/:id").get(getAllRecordsByID);
router.route('/addrecord/:id').put(updateRecordHistory);
router.route('/:id').delete(deleteRecord);

export default router;
