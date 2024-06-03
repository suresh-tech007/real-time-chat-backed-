import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import gerateTokenAndsetCookie from "../utils/generateToken.js";

export const singup = async (req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body;
        
        if(password !== confirmPassword){
            return res.status(400).json({error:"Password don't match"})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilepic:gender ==="male" ? boyProfilepic : girlProfilepic
        })

        if(newUser){
 
            await gerateTokenAndsetCookie(newUser._id,res)
            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username : newUser.username,
            profilepic: newUser.profilepic
        });

        }
        else{
            res.status(400).json({error:"Invalid user data "})
        }
        
    } catch (error) {
       
        res.status(500).json({error:"internal Server Error "});
        
    }
}
export const login= async (req,res)=>{
try{
    const {username,password} = req.body;
     
    const user = await User.findOne({ username})
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error: "Invalid username and password "})
    }

    gerateTokenAndsetCookie(user._id,res)

    res.status(200).json({
    
            _id: user._id,
            fullName: user.fullName,
            username : user.username,
            profilepic: user.profilepic
        

    })


} catch (error) {
     
    res.status(500).json({error:"internal Server Error "});
    
}
}
export const logout=  (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})

    }
    catch (error) {
        
        res.status(500).json({error:"internal Server Error "});
        
    }
}