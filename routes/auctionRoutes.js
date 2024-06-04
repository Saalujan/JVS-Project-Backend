import express from "express";
import { addAuction, deleteAuction, getAllAuctions } from "../controllers/auctionController.js";

const router = express.Router();

router.route("/addauction").post(addAuction);
router.route("/").get(getAllAuctions);
router.route("/:id").delete(deleteAuction);

export default router;
