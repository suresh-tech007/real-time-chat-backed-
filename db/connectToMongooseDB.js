import mongoose  from "mongoose";

const connectToMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("connect to Mongodb")
        
    } catch (error) {
        console.log("Error connecting to MongoDB",error.message) 
    }
}

export default connectToMongoDB;