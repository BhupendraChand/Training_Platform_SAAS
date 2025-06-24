



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


import upload from "../../../middleware/multer.upload"
// const upload = multer({storage : storage })

// import {multer,storage} from './../../../middleware/multerMiddleware'
// cb(error,success), cb(error)




const router: Router = express.Router()

router.route("/")
    .post(isLoggedIn,upload.single('courseThumbnail'),asyncErrorHandler(createCourse))
    .get(isLoggedIn, asyncErrorHandler(getAllCourse))


router.route("/:id")
    .get( asyncErrorHandler(getSingleCourse))
    .patch(isLoggedIn, asyncErrorHandler(updateCourse))
    .delete(isLoggedIn, asyncErrorHandler(deleteCourse))

export default router

