import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModal.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber, profilePic, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phoneNumber,
    profilePic,
    role,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      data: user,
      message: "Registered Succesfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid user Data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const { username, password } = req.body;
  if (token) {
    return res.status(200).json({ message: "logged in successfully" });
  } else if (username && password) {
    if (!/\S+@\S+\.\S+/.test(username)) {
      res.status(400).json({ message: "Enter valid email" });
      return;
    }
    const user = await User.findOne({ email: username });

    if (user && (await user.matchPassword(password))) {
      let token = generateToken(res, user._id);
      return res.status(200).json({
        data: {
          token: token,
        },
        message: "logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Email or password is incorrect" });
    }
  } else {
    username
      ? res.status(400).json({ message: "password required" })
      : res.status(400).json({ message: "username required" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: "User logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: "User is Empty !" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Failed to fetch users from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

const getUserProfilebyId = asyncHandler(async (req, res) => {
  try {
    let _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found !" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  let _id = req.params.id;
  const user = await User.findById(_id);
  if (user) {
    const originalUserData = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePic: user.profilePic,
      password: user.password,
    };

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.profilePic = req.body.profilePic || user.profilePic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const isUserDataChanged =
      Object.keys(originalUserData).some(
        (key) => user[key] !== originalUserData[key]
      ) ||
      (req.body.password && req.body.password !== user.password);

    if (isUserDataChanged) {
      await user.save();
      res.status(200).json({
        message: "Profile Updated Succesfully",
      });
    } else {
      return res.status(201).json({
        message: "No changes made",
      });
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not Found !" });
    }
    res.status(200).json({ message: "User Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const _id = req.user._id;

  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(_id);

  if (user && (await user.matchPassword(currentPassword || ""))) {
    if (newPassword) {
      if (newPassword === confirmPassword) {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
      } else {
        res.status(400);
        throw new Error("new password and confirm password do not match");
      }
    } else {
      throw new Error("Invalid Inputs");
    }
  } else {
    res.status(401);
    throw new Error("Invalid Old Password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  registerUser,
  authUser,
  logoutUser,
  getAllUsers,
  getUserProfilebyId,
  updateUserProfile,
  deleteUser,
  getUserProfile,
  changePassword,
};
