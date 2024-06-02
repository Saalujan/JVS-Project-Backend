import asyncHandler from "express-async-handler";
import Content from "../models/contentModel.js";

const addContent = asyncHandler(async (req, res) => {
  const { content, description, status, image } = req.body;

  const contents = await Content.create({
    content,
    description,
    status,
    image,
  });

  if (contents) {
    res.status(200).json({
      data: contents,
      message: "Content added Sucessfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Content Data");
  }
});

const getAllContents = asyncHandler(async (req, res) => {
  try {
    const contents = await Content.find({});
    if (contents.length === 0) {
      return res.status(404).json({ message: "Content is Empty !" });
    }
    res.status(200).json(contents);
  } catch (err) {
    console.error("Failed to fetch Content from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});

const updateContent = asyncHandler(async (req, res) => {
  let _id = req.params.id;
  const content = await Content.findById(_id);

  if (content) {
    content.content = req.body.content || content.content;
    content.description = req.body.description || content.description;
    content.status = req.body.status || content.status;
    const updatedContent = await fees.save();
    res.json(updatedContent);
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

const deleteContent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndDelete(id);
    if (!content) {
      return res.status(404).json({ message: "Content not Found !" });
    }
    res.status(200).json({ message: "Content Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export { addContent, getAllContents, updateContent, deleteContent };
