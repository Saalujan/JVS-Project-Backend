import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerCustomer,
  getCustomerProfile,
  getAllCustomers,
  deleteCustomer,
  authCustomer,
  logoutCustomer,
  updateCustomerProfile,
  getCustomerProfilebyId,
} from "../controllers/customerController.js";

const router = express.Router();

router.route("/register").post(registerCustomer);
router.route("/auth").post(authCustomer);
router.route("/logout").post(logoutCustomer);
router.route("/").get(getAllCustomers);
router.get("/currentcustomer", protect, getCustomerProfile);
router.route("/:id").get(getCustomerProfilebyId).put(updateCustomerProfile);
router.route("/:id").delete(deleteCustomer);

export default router;
