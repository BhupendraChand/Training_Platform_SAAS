
import express, { Router } from "express"
import {createInstitute,createTeacherTable,createStudentTable,createCourseTable} from "../../controller/institute/institute.controller"
import isLoggedIn from "../../middleware/middleware"



const router:Router = express.Router()

router.route("/").post(isLoggedIn, createInstitute,createTeacherTable,createStudentTable,createCourseTable)


export default router