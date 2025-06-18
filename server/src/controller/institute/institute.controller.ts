import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInsituteNumber from "../../services/generate.random.institute.number";
import { IExtendedRequest } from "../../middleware/type";
import User from "../../database/models/user.model";
import asyncErrorHandler from "../../services/asyncErrorHandler";

const createInstitute =asyncErrorHandler( async (
    req:IExtendedRequest,
    res:Response,
    next:NextFunction)=>{
    // console.log(req.user ,"Name from middleware")

   
     
        const {instituteName,
            instituteEmail,
            institutePhoneNumber,
            instituteAddress} = req.body 
        const instituteVatNo = req.body.instituteVatNo || null 
        const institutePanNo = req.body.institutePanNo || null
        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message : "Please provide  instituteName,instituteEmail, institutePhoneNumber,  instituteAddress "
            })
            return
        }
 
        const instituteNumber =   generateRandomInsituteNumber()  
        // create institute table
       await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            instituteName VARCHAR(255) NOT NULL, 
            instituteEmail VARCHAR(255) NOT NULL UNIQUE, 
            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE, 
            instituteAddress VARCHAR(255) NOT NULL, 
            institutePanNo VARCHAR(255), 
            instituteVatNo VARCHAR(255), 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`)

        await sequelize.query(`INSERT INTO institute_${instituteNumber}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,{
            replacements : [
                instituteName,
                instituteEmail,
                institutePhoneNumber,
                instituteAddress,
                institutePanNo,
                instituteVatNo
            ]
        })
      
///create  history table 
await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    userId VARCHAR(255) REFERENCES users(id), 
    instituteNumber INT UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`)

  if(req.user){
await sequelize.query(`INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,{
    replacements : [
        req.user.id,
        instituteNumber
    ]
})



//     const userData= await User.findByPk(req.user.id)
//     req.user?.instituteNumber = instituteNumber
//     await user?.save() 
// }


await User.update({
    currentInstituteNumber: instituteNumber,
    role:"institute"
},{
        where: {
            id: req.user.id
        }
    })
}
  req.instituteNumber = instituteNumber  
       
        next()
     
    }
)

const createTeacherTable = async (
    req:IExtendedRequest,
    res:Response,
    next:NextFunction)=>{
    try{
        const instituteNumber= req.instituteNumber
       
        // create teacher table    
await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
           id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            teacherName VARCHAR(255) NOT NULL, 
            teacherEmail VARCHAR(255) NOT NULL , 
            teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
            teacherExpertise VARCHAR(255) NOT NULL,
            joinedDate DATE NOT NULL,
            teacherSalary VARCHAR(255)  NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            
            )`)
    next()
}catch(error){
    console.log(error,"Error for creating  teacher table")
        res.status(500).json({
            message : error
        })
       }
}

const createStudentTable = async(req:IExtendedRequest,res:Response,next:NextFunction)=>{
    
   
       try {

    // create student table
    const instituteNumber = req.instituteNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        studentName VARCHAR(255) NOT NULL, 
        studentPhoneNo VARCHAR(255) NOT NULL UNIQUE,
        studentAddress VARCHAR(255) NOT NULL,
        enrolledDate DATE  NOT NULL,
        studentImage VARCHAR(255) ,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
    next()
      } catch (error) {
        console.log(error,"Error for creating student table")
        res.status(500).json({
            message : error
        })
       }
}

const createCourseTable = async(req:IExtendedRequest,res:Response)=>{
    
    const instituteNumber = req.instituteNumber

    // create course table
    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        courseName VARCHAR(255) NOT NULL , 
        coursePrice VARCHAR(255) NOT NULL,
        courseDuration VARCHAR(255) NOT NULL,
        courseLevel ENUM('beginner','intermediate','advanced'),
         courseThumbnail VARCHAR(200),
        courseDescription TEXT, 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
    

     res.status(200).json({
            message : "Institute Inserted Successfully!",
            instituteNumber, 
        })
       
    }



export { createInstitute,createTeacherTable,createStudentTable,createCourseTable}