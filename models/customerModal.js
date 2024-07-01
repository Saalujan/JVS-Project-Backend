import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const customerSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    dob: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "3",
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    description:{
      type:String,
      required:false,
    },
    creationDate: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
