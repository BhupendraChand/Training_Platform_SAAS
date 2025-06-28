import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";
import { QueryTypes } from "sequelize";


// Create Course
const createCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const {
    coursePrice,
    courseName,
    courseDescription,
    courseDuration,
    courseLevel,
  } = req.body;
  if (
    !coursePrice ||
    !courseName ||
    !courseDescription ||
    !courseDuration ||
    !courseLevel
  ) {
    return res.status(400).json({
      messsage:
        "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel",
    });
  }
  // const courseThumbnail = null
  const courseThumbnail = req.file ? req.file.path : null;
  const returnedData = await sequelize.query(
    `INSERT INTO course_${instituteNumber}
    (coursePrice,
    courseName,
    courseDescription,
    courseDuration,
    courseLevel,
    courseThumbnail) 
    VALUES(?,?,?,?,?,?)`,
    
    {
      type: QueryTypes.INSERT,
      replacements: [
        coursePrice,
        courseName,
        courseDescription,
        courseDuration,
        courseLevel,
        courseThumbnail ,
       
      ],
    }
  );

  console.log(returnedData);
  res.status(201).json({
    message: "Course created successfully",
  });
};

///// Delete Course
const deleteCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;
  // first check if course exists or not , if exists --> delete else not delete
  const courseData = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} WHERE id=?`,
    {
      replacements: [courseId],
         type : QueryTypes.SELECT
    }
  )

  if (courseData.length == 0) {
    return res.status(404).json({
      message: "No course with that id",
    });
  }

  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`, {
    replacements: [courseId],
     type : QueryTypes.DELETE
  });
  res.status(200).json({
    message: "Course deleted Successfully.",
  });
};

//// Get All Courses
const getAllCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  console.log("Current institute number:", req.user?.currentInstituteNumber);

  const courses = await sequelize.query(
    `SELECT * FROM course_${instituteNumber}`,
    
    {
      type: QueryTypes.SELECT,
    }
    
  );
  res.status(200).json({
    message: "Course fetched Successfully.",
    data: courses,
    
  });
};

// Get Single Course
const getSingleCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;
  const course = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
    {
      replacements: [courseId],
        type : QueryTypes.SELECT
    }
  );
  res.status(200).json({
    message: "Single Course fetched Successfully.",
    data: course,
  });
};

///Update Course
const updateCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;
  const {
    coursePrice,
    courseName,
    courseDescription,
    courseDuration,
    courseLevel,
  } = req.body;

  if (
    !coursePrice ||
    !courseName ||
    !courseDescription ||
    !courseDuration ||
    !courseLevel
  ) {
    return res.status(400).json({
      messsage:
        "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel",
    });
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
      type: QueryTypes.UPDATE,
      replacements: [
        coursePrice,
        courseName,
        courseDescription,
        courseDuration,
        courseLevel,
        courseId,
      ],
    }
  );

  res.status(200).json({
    message: "Course updated Successfully.",
  });
};

export {
  createCourse,
  deleteCourse,
  getSingleCourse,
  getAllCourse,
  updateCourse,
};
