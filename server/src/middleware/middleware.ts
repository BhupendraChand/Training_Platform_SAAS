import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import User from "../database/models/user.model"

interface IExtendedRequest extends Request{
   user ?: {
    email : string, 
    role : string, 
    username : string | null
   }
}

const isLoggedIn = async (req:IExtendedRequest,res:Response,next:NextFunction):Promise<void>=>{
  
    // token accept 

    const token = req.headers.authorization 

    if(!token){
        res.status(401).json({
            message : "Please provide token"
        })
        return
        
    }
    // verify garne 
    jwt.verify(token,'venom',async (error,result : any)=>{
        if(error){
            res.status(403).json({
                message : "Invalid token, please login again"
            })
        }else{
        
            const userData = await User.findByPk(result.id)
            if(!userData){
                res.status(403).json({
                    message : "No user found with that token id, invalid token "
                })
            }else{
                req.user = userData
                next()
            }
        }
    })
}



export default isLoggedIn