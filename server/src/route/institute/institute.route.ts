import express, { Router } from "express"
import createInstitute from "../../controller/institute/institute.controller"

const router:Router = express.Router()

router.route("/").post(createInstitute)


export default router