
import express, { Router } from "express"
import { createInstitute, createTeacherTable, createStudentTable, createCourseTable } from "../../controller/institute/institute.controller"
import isLoggedIn from "../../middleware/middleware"
import asyncErrorHandler from "../../services/asyncErrorHandler"


const router: Router = express.Router()

router.route("/").post(isLoggedIn, createInstitute, createTeacherTable, createStudentTable, asyncErrorHandler(createCourseTable))


export default router