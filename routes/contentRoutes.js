import express from "express";
import {
  addContent,
  deleteContent,
  getAllContents,
  updateContent,
} from "../controllers/contentController.js";

const router = express.Router();

router.route("/addcontent").post(addContent);
router.route("/").get(getAllContents);
router.route("/:id").put(updateContent);
router.route("/:id").delete(deleteContent);

export default router;
