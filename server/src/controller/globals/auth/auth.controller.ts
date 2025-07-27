
import { Request, Response } from 'express';
import User from '../../../database/models/user.model';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import generateJWTToken from "../../../services/generate.jwt.token"
class AuthController {

    // register user
    static async registerUser(req: Request, res: Response) {
        if (req.body == undefined) {
            console.log("triggereed")
            res.status(400).json({
                message: "No data was sent!!"
            })
            return
        }
        const { username, password, email } = req.body
        if (!username || !password || !email) {
            res.status(400).json({
                message: "Please provide username, password, email"
            })
            return
        }

        await User.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: email
        })
        res.status(201).json({
            message: "User Added Successfully"
        })
    }

    

    /// login user 
    static async loginUser(req:Request,res:Response){
    const {email,password} = req.body 
    if(!email || !password){
        res.status(400).json({
            message : "Please provide email,password "
        })
        return
    }
    // check if email exist or not in our users table
    const data = await User.findAll({
        where : {
            email
        }
    }) 
    // select * from User where email
    if(data.length ==0){
        res.status(404).json({
            message : "Not registered!!"
        })
    }else{
    //    check password and hash password
       
          const isPasswordMatch = bcrypt.compareSync(password,data[0].password)
         if(isPasswordMatch){
            // login vayo , token generation 
         const token = generateJWTToken({id:data[0].id})
            res.status(200).json({
                data : {
                    token : token, 
                    username : data[0].userName
                },
                message : "Logged in success"
            })
         }else{
            res.status(403).json({
                message : "Invalid email or password"
            })
         }

    }
   }
   
}


export default AuthController