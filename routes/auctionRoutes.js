import express from "express";
import { addAuction, getAllAuctions } from "../controllers/auctionController.js";

const router = express.Router();

router.route("/addauction").post(addAuction);
router.route("/").get(getAllAuctions);

export default router;
