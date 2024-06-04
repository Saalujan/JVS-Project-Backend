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

const auctionSchema = mongoose.Schema(
  {
    auctionRefID: {
      type: String,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    bidstartprice: {
      type: Number,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: false,
    },
    biddinghistory: {
      type: [
        {
          customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: false,
          },
          biddingprice: {
            type: Number,
            required: false,
          },
        },
      ],
      default: [],
    },
    status: {
      type: String,
      default: "Available",
    },
    comments: {
      type: [String],
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

auctionSchema.pre("save", function (next) {
  if (!this.auctionRefID) {
    this.auctionRefID = generateRandom7CharacterID();
  }
  next();
});

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;
