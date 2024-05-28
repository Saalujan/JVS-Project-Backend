import mongoose from "mongoose";

const generateRandom7CharacterID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const salesSchema = mongoose.Schema(
  {
    salesRefID: {
      type: String,
    },
    creationDate: {
      type: Date,
      default: () => Date.now(),
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: false,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    documents: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

salesSchema.pre("save", function (next) {
  if (!this.salesRefID) {
    this.salesRefID = generateRandom7CharacterID();
  }
  next();
});

const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
