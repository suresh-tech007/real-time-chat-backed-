import express from "express"
import dotenv from  "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import cors from "cors"
app.use(cors({
    origin: 'https://real-time-chat-whatsapp.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true  
}));


app.options('*', cors());

import connectToMongoDB from "./db/connectToMongooseDB.js"
import cookieParser from "cookie-parser"
import { app ,server} from "./socket/socket.js"


dotenv.config()

const port = process.env.PORT || 5000;
 

app.use(express.json())  // to parse the incoming requests with JSON payloads  (from req.body)
app.use(cookieParser())



app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)


// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "fronted", "dist",  "index.html"));
// });



server.listen(port,()=>{
    connectToMongoDB()

    console.log(`server is running on http://localhost:${port}`)

}); 
