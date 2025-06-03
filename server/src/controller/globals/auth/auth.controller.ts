
import {Request,Response} from 'express';
import User from '../../../database/models/user.model';
const registerUser = async (req:Request,res:Response)=>{

   const {username,password,email} = req.body
   if(!username || !password || !email){
     res.status(400).json({
        message : "Please provide username, password, email"
    })
    return
   }
    // insert into Users table 
    await User.create({
        username :username, 
        password : password, 
        email : email
    })
    res.status(200).json({
        message : "User registered successfully"
    })
   

} 

// export {registerUser}


class AuthController{
   static async registerUser(req:Request,res:Response){
    const {username,password,email} = req.body
    if(!username || !password || !email){
      res.status(400).json({
         message : "Please provide username, password, email"
     })
     return
    }
     
     await User.create({
         username :username, 
         password : password, 
         email : email
     })
     res.status(200).json({
         message : "User registered successfully"
     })
   }
}

export default AuthController