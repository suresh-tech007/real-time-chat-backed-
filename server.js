import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./db/connectToMongooseDB.js";

// Load environment variables
dotenv.config();

// Configure the app
const port = process.env.PORT || 5000;

// Enable CORS for specified origin
app.use(cors({
    origin: 'https://real-time-chat-whatsapp.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true  
}));

app.options('*', cors());

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Uncomment and adjust these lines if you serve a frontend from this server
// import path from "path";
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// Start the server and connect to MongoDB
server.listen(port, () => {
    connectToMongoDB()
        .then(() => {
            console.log(`Connected to MongoDB and server is running on http://localhost:${port}`);
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
});
