import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "Active",
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);
export default Content;
