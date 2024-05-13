import express from "express";

import { registerCustomer,getCustomerProfile, getAllCustomers, deleteCustomer } from "../controllers/customerController.js";


const router = express.Router();

router.route('/register').post(registerCustomer);
router.route('/').get(getAllCustomers);
router.route('/:id').get(getCustomerProfile);
router.route('/:id').delete(deleteCustomer);

export default router;
