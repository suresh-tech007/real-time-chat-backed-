import jwt from "jsonwebtoken"

const gerateTokenAndsetCookie = (userId , res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
 res.cookie("jwt",token,{
    maxAge: 15* 24*60*60*1000, //MS
    httpOnly: true, // prevent xss attacks cross-site scripting attacks 
    sameSite:process.env.NODE_ENV !== "development" // CSRF attacks cross-site request forgery attacks
 })
}

export default gerateTokenAndsetCookie ;