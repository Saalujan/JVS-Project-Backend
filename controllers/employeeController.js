import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Employee from "../models/employeeModel.js";
import { sendCustomerRegistrationEmail } from "../utils/employeeMail.js";
import generateRandomPassword from "../utils/passwordUtils.js";

const registerEmployee = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, profilePic, role } = req.body;

  const employeeExists = await Employee.findOne({ email });

  if (employeeExists) {
    res.status(400);
    throw new Error("Employee already exists");
  }

  const generatedPassword = generateRandomPassword();

  const employee = await Employee.create({
    name,
    email,
    password: generatedPassword,
    phoneNumber,
    profilePic,
    role,
  });

  if (employee) {
    generateToken(res, employee._id);
    sendCustomerRegistrationEmail(email, name, generatedPassword);
    res.status(200).json({
      data: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        phoneNumber: employee.phoneNumber,
        profilePic: employee.profilePic,
        creationDate: employee.creationDate,
      },
      message: "Employee Register successfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Employee Data");
  }
});

const authEmployee = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const { username, password } = req.body;
  if (token) {
    return res.status(200).json({ message: "logged in successfully" });
  } else if (username && password) {
    if (!/\S+@\S+\.\S+/.test(username)) {
      res.status(400).json({ message: "Enter valid email" });
      return;
    }
    const employee = await Employee.findOne({ email: username });

    if (employee && (await employee.matchPassword(password))) {
      let token = generateToken(res, employee._id);
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

const logoutEmployee = asyncHandler(async (req, res) => {
  res.cookie("jwt", null, {
    httpOnly: true,
    expires: new Date(0),
    // secure: true,
    // sameSite:'strict',
  });

  res.status(200).json({ message: "Logout Successfully" });
});

const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find({});
    if (employees.length === 0) {
      return res.status(404).json({ message: "Employee is Empty !" });
    }
    res.status(200).json(employees);
  } catch (err) {
    console.error("Failed to fetch Employee from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

const getEmployeeProfile = asyncHandler(async (req, res) => {
  try {
    let _id = req.params.id;
    const employee = await Employee.findById(_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found !" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



const updateEmployeeProfile = asyncHandler(async (req, res) => {
  let _id = req.params.id;
  const employee = await Employee.findById(_id);
  if (employee) {
    const originalUserData = {
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      profilePic: employee.profilePic,
      password: employee.password,
    };

    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.phoneNumber = req.body.phoneNumber || employee.phoneNumber;
    employee.profilePic = req.body.profilePic || employee.profilePic;

    if (req.body.password) {
      employee.password = req.body.password;
    }

    const isEmployeeDataChanged =
      Object.keys(originalUserData).some(
        (key) => employee[key] !== originalUserData[key]
      ) ||
      (req.body.password && req.body.password !== employee.password);

    if (isEmployeeDataChanged) {
      await employee.save();
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
    throw new Error("Employee not found");
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not Found !" });
    }
    res.status(200).json({ message: "Employee Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getEmployeeInfo = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(req.employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const changeEmployeePassword = asyncHandler(async (req, res) => {
  const _id = req.employee._id;

  const { currentPassword, newPassword, confirmPassword } = req.body;

  const employee = await Employee.findById(_id);

  if (employee && (await employee.matchPassword(currentPassword || ""))) {
    if (newPassword) {
      if (newPassword === confirmPassword) {
        employee.password = newPassword;
        await employee.save();
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

export {
  registerEmployee,
  authEmployee,
  logoutEmployee,
  getAllEmployees,
  getEmployeeProfile,
  updateEmployeeProfile,
  deleteEmployee,
  getEmployeeInfo,
  changeEmployeePassword
};
