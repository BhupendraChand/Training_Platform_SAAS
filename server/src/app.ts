import express from 'express'
const app = express()
import instituteRoute from './route/institute/institute.route';
import authRoute from './route/globals/auth/auth.route';

app.use(express.json());


/// auth route
 app.use("/api", authRoute);

 /// institute route
 app.use("/api/institute",instituteRoute)
export default app;