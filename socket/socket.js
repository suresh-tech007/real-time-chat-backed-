import { Server } from "socket.io";
import http from "http";
import express from "express";

// Initialize Express app
const app = express();

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://real-time-chat-whatsapp.netlify.app"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Map to store user socket IDs
const userSocketMap = {};

// Function to get receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// Handle socket connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Emit the list of online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

// Export the app, io, and server instances
export { app, io, server };
