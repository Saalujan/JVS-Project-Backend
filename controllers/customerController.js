import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Customer from "../models/customerModal.js";

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
  });

  if (customer) {
    generateToken(res, customer._id);
    res.status(200).json({ data: customer, message: "Registered Succesfully" });
  } else {
    res.status(400);
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

export { registerCustomer,getAllCustomers,getCustomerProfile,deleteCustomer };
