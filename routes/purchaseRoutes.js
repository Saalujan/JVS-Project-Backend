import express from "express";
import {
  addPurchase,
  deletePurchase,
  getAllPurchase,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.route("/addpurchase").post(addPurchase);
router.route("/").get(getAllPurchase);
router.route("/:id").delete(deletePurchase);

export default router;
