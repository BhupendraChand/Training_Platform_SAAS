



import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import {
    createCourse,
    deleteCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse
} from "../../../controller/institute/course/course.controller"


const router: Router = express.Router()

router.route("/")
    .post(isLoggedIn, asyncErrorHandler(createCourse))
    .get(isLoggedIn, asyncErrorHandler(getAllCourse))


router.route("/:id")
    .get(isLoggedIn, asyncErrorHandler(getSingleCourse))
    .patch(isLoggedIn, asyncErrorHandler(updateCourse))
    .delete(isLoggedIn, asyncErrorHandler(deleteCourse))

export default router

