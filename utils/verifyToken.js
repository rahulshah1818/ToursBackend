import Jwt from "jsonwebtoken";

const verifyToken = (req, res,next)=>{
    const token =  req.cookies.accessToken

    if(!token){
        return res.status(401).json({success:false, message:"You are not authorized"})
    }

    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if (err){
            return res.status(401).json({success:false, message:"token is invalid"})
        }
        req.user = user
        next()
    })
}

export const verifyAdmin = (req, res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.role === 'admin'){
            next()
        }else{
            return res.status(401).json({success:false, message:"You are not authorized"})
        }
    })
}