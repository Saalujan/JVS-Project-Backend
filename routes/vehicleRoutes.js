import express from "express";
import { addVehicle, deleteVehicle, getAllVehciles, vehicleDetail } from "../controllers/vehicleController.js";

const router = express.Router();

router.route('/addvehicle').post(addVehicle);
router.route('/').get(getAllVehciles);
router.route('/:id').get(vehicleDetail);
router.route('/:id').delete(deleteVehicle);

export default router;