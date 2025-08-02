import express from 'express'
const app = express()
import instituteRoute from './route/institute/institute.route';
import authRoute from './route/globals/auth/auth.route';
import courseRoute from './route/institute/course/course.route'
import studentRoute from './route/institute/student/student.route'
import categoryRoute from './route/institute/category/category.route'
import teacherInstituteRoute from './route/institute/teacher/teacher.route'
import teacherRoute from './route/teacher/teacher.route'
import cors from 'cors'

app.use(cors({
    origin : ["http://localhost:3000","http://localhost:3001"]
}))


app.use(express.json());


/// auth route
 app.use("/api", authRoute);

 /// institute route
 app.use("/api/institute",instituteRoute)

/// course route
app.use('/api/insitute/course',courseRoute)

/// student route
app.use('/api/institute/student',studentRoute)

/// category route
app.use('/api/institute/category',categoryRoute)

///Institute teacher route
app.use('/api/institute/teacher',teacherInstituteRoute)

// Teacher Route
app.use('/api/teacher',teacherRoute)

export default app;