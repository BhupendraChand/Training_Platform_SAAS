
import { Request, Response } from 'express';
import User from '../../../database/models/user.model';
import bcrypt from "bcrypt"

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
    static async loginUser(req: Request, res: Response) {
        if (req.body == undefined) {
            res.status(400).json({
                message: "No data Sent!"
            })
            return
        }

        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({
                message: "Please Enter the Email and Password!"
            })
        }

        //for email check
        const [data] = await User.findAll({
            where:
            {
                email
            }
        })

        if (data) {
            const passwordMatched = bcrypt.compareSync(password, data.password)

            if (passwordMatched) {
                //create token
                res.status(200).json({
                    message: "Login Successfully!"
                })
            } else {
                res.status(400).json({
                    message: "Invalid Password!"
                })
            }

        } else {
            res.status(400).json({
                message: "Email  is not registered!"
            })
        }
    }
}



export default AuthController