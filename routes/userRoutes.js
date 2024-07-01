import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  authUser,
  logoutUser,
  getAllUsers,
  getUserProfilebyId,
  updateUserProfile,
  deleteUser,
  getUserProfile,
  changePassword
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/auth").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/").get(getAllUsers);
router.get("/currentuser", protect, getUserProfile);
router.put("/changepassword",protect,changePassword);
router.route("/:id").get(getUserProfilebyId).put(updateUserProfile);
router.route("/:id").delete(deleteUser);

export default router;
