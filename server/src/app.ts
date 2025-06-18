import express from 'express'
const app = express()
import instituteRoute from './route/institute/institute.route';
import authRoute from './route/globals/auth/auth.route';
import courseRoute from './route/institute/course/course.route'
import studentRoute from './route/institute/student/student.route'

app.use(express.json());


/// auth route
 app.use("/api", authRoute);

 /// institute route
 app.use("/api/institute",instituteRoute)

/// course route
app.use('/api/insitute/course',courseRoute)


/// student route
app.use('/api/institute/student',studentRoute)
export default app;