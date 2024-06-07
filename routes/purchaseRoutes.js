import express from "express";
import {
  addPurchase,
  deletePurchase,
  getAllPurchase,
  updatePurchase,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.route("/addpurchase").post(addPurchase);
router.route("/").get(getAllPurchase);
router.route("/:id").delete(deletePurchase);
router.route("/:id").put(updatePurchase);

export default router;
