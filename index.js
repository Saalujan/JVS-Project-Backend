import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import expertchatRoutes from "./routes/expertchatRoutes.js";
import recordsRoutes from "./routes/recordsRoutes.js";
import aichatRoutes from "./routes/aichatRoutes.js";
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/auction", auctionRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/expertchats", expertchatRoutes);
app.use("/api/records", recordsRoutes);
app.use("/api/", aichatRoutes);

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust according to your requirements
  },
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Attach io to app for access in routes
app.set('io', io);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
