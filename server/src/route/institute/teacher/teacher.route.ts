

import express, { Router } from 'express'
import isLoggedIn from '../../../middleware/middleware';
import asyncErrorHandler from '../../../services/asyncErrorHandler';
import { createTeacher, deleteTeacher, getTeachers } from '../../../controller/institute/teacher/teacher.controller';
import upload from '../../../middleware/multer.upload';

const router:Router = express.Router()

router.route("/").post(isLoggedIn,upload.single('teacherPhoto'), asyncErrorHandler(createTeacher)).get(isLoggedIn,asyncErrorHandler(getTeachers))

router.route("/:id").delete(isLoggedIn,asyncErrorHandler(deleteTeacher))


export default router;