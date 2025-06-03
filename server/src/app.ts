import express from 'express'
const app = express()

import authRoute from './route/globals/auth/auth.route';


 app.use("/api", authRoute);
export default app;