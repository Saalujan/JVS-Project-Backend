import express from "express";
import { addVehicle } from "../controllers/vehicleController.js";

const router = express.Router();

router.route('/addvehicle').post(addVehicle);

export default router;