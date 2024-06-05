import express from "express";
import {
  addAuction,
  auctionInfo,
  deleteAuction,
  getAllAuctions,
  updateAuction,
} from "../controllers/auctionController.js";

const router = express.Router();

router.route("/addauction").post(addAuction);
router.route("/").get(getAllAuctions);
router.route("/:id").delete(deleteAuction);
router.route("/:id").get(auctionInfo);
router.route("/:id").put(updateAuction);

export default router;
