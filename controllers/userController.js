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
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profilePic: user.profilePic,
      creationDate: user.creationDate,
    });
  } else {
    res.status(400);
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
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profilePic: user.profilePic,
          creationDate: user.creationDate,
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
  res.cookie("jwt", null, {
    httpOnly: true,
    expires: new Date(0),
    // secure: true,
    // sameSite:'strict',
  });

  res.status(200).json({ message: "Logout Successfully" });
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

const getUserProfile = asyncHandler(async (req, res) => {
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
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.profilePic = req.body.profilePic || user.profilePic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profilePic: updatedUser.profilePic,
        creationDate: user.creationDate,
      },
      message: "User Updated Succesfully",
    });
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

export {
  registerUser,
  authUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
