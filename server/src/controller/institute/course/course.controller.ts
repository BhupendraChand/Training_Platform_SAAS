import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";


// Create Course
const createCourse = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber
    const { coursePrice,
        courseName,
        courseDescription,
        courseDuration,
        courseLevel } = req.body
    if (!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel) {
        return res.status(400).json({
            messsage: "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel"
        })
    }
    const courseThumbnail = null

    const returnedData = await sequelize.query(`INSERT INTO course_${instituteNumber}
    (coursePrice,
    courseName,
    courseDescription,
    courseDuration,
    courseLevel,
    courseThumbnail) 
    VALUES(?,?,?,?,?,?)`, {
        replacements:
            [
                coursePrice,
                courseName,
                courseDescription,
                courseDuration,
                courseLevel,
                courseThumbnail || "https://digitalpathshalanepal.com/image/hello.png"]
    })

    console.log(returnedData)
    res.status(201).json({
        message: 'Course created successfully'
    })
}


///// Delete Course
const deleteCourse = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber
    const courseId = req.params.id
    // first check if course exists or not , if exists --> delete else not delete 
    const [courseData] = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`, {
        replacements: [courseId]
    })

    if (courseData.length == 0) {
        return res.status(404).json({
            message: "No course with that id"
        })
    }

    await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`, {
        replacements: [courseId]
    })
    res.status(200).json({
        message: "Course deleted Successfully."
    })
}

//// Get All Courses
const getAllCourse = async (req: IExtendedRequest, res: Response) => {

    const instituteNumber = req.user?.currentInstituteNumber
    console.log("Current institute number:", req.user?.currentInstituteNumber);

    const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
    res.status(200).json({
        message: "Course fetched Successfully.",
        data: courses
    })
}



// Get Single Course
const getSingleCourse = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id
    const course = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ?`, {
        replacements: [courseId]
    })
    res.status(200).json({
        message: "Single Course fetched Successfully.",
        data: course
    })
}


///Update Course
const updateCourse = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id
    const { coursePrice, courseName, courseDescription, courseDuration, courseLevel } = req.body

    if (!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel) {
        return res.status(400).json({
            messsage: "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel"
        })
    }

    await sequelize.query(
        `UPDATE course_${instituteNumber} 
   SET coursePrice = ?,
    courseName = ?,
     courseDescription = ?,
      courseDuration = ?, 
      courseLevel = ?
   WHERE id = ?`,
        {
            replacements: [
                coursePrice,
                courseName,
                courseDescription,
                courseDuration,
                courseLevel,
                courseId]
        }
    )

    res.status(200).json({
        message: "Course updated Successfully."
    })
}

export { createCourse, deleteCourse, getSingleCourse, getAllCourse, updateCourse };