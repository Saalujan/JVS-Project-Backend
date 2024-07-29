import mongoose from "mongoose";

const generateRandom7CharacterID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const recordsSchema = mongoose.Schema(
  {
    recordsRefID: {
      type: String,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
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
    recordhistory: {
      type: [
        {
          content: {
            type: String,
            required: false,
          },
          creationDate: {
            type: Date,
            default: () => Date.now(),
          },
          details: {
            type: String,
            required: false,
          },
          documents: {
            type: [String],
            required: false,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

recordsSchema.pre("save", function (next) {
  if (!this.recordsRefID) {
    this.recordsRefID = generateRandom7CharacterID();
  }
  next();
});

const Records = mongoose.model("Records", recordsSchema);

export default Records;
