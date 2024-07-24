import express from 'express';
const router = express.Router();
import Chat from '../models/chatModel.js';

router.post('/', async (req, res) => {
  try {
    const { senderId, senderModel, receiverId, receiverModel, message } = req.body;
    const newMessage = new Chat({ sender: senderId, senderModel, receiver: receiverId, receiverModel, message });
    const savedMessage = await newMessage.save();

    // Emit the new message event
    req.app.get('io').emit('message', savedMessage);

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:senderId/:senderModel/:receiverId/:receiverModel', async (req, res) => {
  try {
    const { senderId, senderModel, receiverId, receiverModel } = req.params;
    const messages = await Chat.find({
      $or: [
        { sender: senderId, senderModel, receiver: receiverId, receiverModel },
        { sender: receiverId, senderModel: receiverModel, receiver: senderId, receiverModel: senderModel },
      ],
    }).exec();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
