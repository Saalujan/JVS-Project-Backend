import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Customer from "../models/customerModal.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "healerz763@gmail.com",
    pass: "reyx mitu tsmn quej",
  },
});

const registerCustomer = asyncHandler(async (req, res) => {
  const {
    fname,
    lname,
    email,
    password,
    profilePic,
    dob,
    address,
    nic,
    gender,
    phoneNo,
    city,
    role,
    description,
  } = req.body;

  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    res.status(400);
    throw new Error("Customer already exists");
  }

  const customer = await Customer.create({
    fname,
    lname,
    email,
    password,
    profilePic,
    dob,
    address,
    nic,
    gender,
    phoneNo,
    city,
    role,
    description,
  });

  if (customer) {
    generateToken(res, customer._id);
    sendRegistrationEmail(email, fname, password);
    res.status(200).json({ data: customer, message: "Registered Succesfully" });
  } else {
    res.status(401);
    throw new Error("Invalid user Data");
  }
});

const getAllCustomers = asyncHandler(async (req, res) => {
  try {
    const customers = await Customer.find({});
    if (customers.length === 0) {
      return res.status(404).json({ message: "Customer is Empty !" });
    }
    res.status(200).json(customers);
  } catch (err) {
    console.error("Failed to fetch Customers from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

const getCustomerProfile = asyncHandler(async (req, res) => {
  try {
    let _id = req.params.id;
    const customer = await Customer.findById(_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer Not Found !" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteCustomer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not Found !" });
    }
    res.status(200).json({ message: "Customer Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const sendRegistrationEmail = async (email, fname, password) => {
  return new Promise((resolve, reject) => {
    const message = `
      <p style="font-weight: bold;">Dear ${fname},</p>
      <p style="color:green;font-weight: bold;">Your registration was successful.</p>
      <br>
      <p>Your Username: ${email}</p>
      <p>Your Password: ${password}</p>
      <br>
      <p>Please join us and enjoy our services.</p>
      <p>Regards,<br/>Jaffna Vehicle Spot (PVT) LTD</p>
    `;

    transporter.sendMail(
      {
        from: '"Jaffna Vehicle Spot (PVT) LTD" <your.email@example.com>',
        to: email,
        subject: "Registration Successful",
        html: message,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending registration email:", error);
          reject(error);
        } else {
          console.log("Registration email sent to:", email);
          console.log("Message sent: %s", info.messageId);
          resolve();
        }
      }
    );
  });
};

const authCustomer = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const { username, password } = req.body;
  if (token) {
    return res.status(200).json({ message: "logged in successfully" });
  } else if (username && password) {
    if (!/\S+@\S+\.\S+/.test(username)) {
      res.status(400).json({ message: "Enter valid email" });
      return;
    }
    const customer = await Customer.findOne({ email: username });

    if (customer && (await customer.matchPassword(password))) {
      let token = generateToken(res, customer._id);
      return res.status(200).json({
        data: {
          token: token,
          _id: customer._id,
          fname: customer.fname,
          lname: customer.lname,
          email: customer.email,
          password: customer.password,
          profilePic: customer.profilePic,
          dob: customer.dob,
          address: customer.address,
          nic: customer.nic,
          gender: customer.gender,
          phoneNo: customer.phoneNo,
          city: customer.city,
          role: customer.role,
          description: customer.description,
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

const logoutCustomer = asyncHandler(async (req, res) => {
  res.cookie("jwt", null, {
    httpOnly: true,
    expires: new Date(0),
    // secure: true,
    // sameSite:'strict',
  });

  res.status(200).json({ message: "Logout Successfully" });
});


const updateCustomerProfile = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const customer = await Customer.findById(_id);

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  const originalCustomerData = { ...customer.toObject() };
  const updateFields = [
    "fname", "lname", "email", "profilePic", "dob", "address",
    "nic", "phoneNo", "city", "description"
  ];

  updateFields.forEach(field => {
    customer[field] = req.body[field] || customer[field];
  });

  if (req.body.password) {
    customer.password = req.body.password;
  }
  
  const isCustomerDataChanged = updateFields.some(key => customer[key] !== originalCustomerData[key]) || (req.body.password && req.body.password !== customer.password);

  if (isCustomerDataChanged) {
    const updatedCustomer = await customer.save();
    res.json({
      data: { ...updatedCustomer.toObject() },
      message: "Customer Updated Successfully",
    });
  } else {
    res.status(201).json({
      message: "No changes made",
    });
  }
});


export {
  registerCustomer,
  getAllCustomers,
  getCustomerProfile,
  deleteCustomer,
  authCustomer,
  logoutCustomer,
  updateCustomerProfile,
};
