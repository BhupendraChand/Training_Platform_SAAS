
import express, { Router } from "express"
import createInstitute from "../../controller/institute/institute.controller"
import isLoggedIn from "../../middleware/middleware"



const router:Router = express.Router()

router.route("/").post(isLoggedIn, createInstitute)


export default router