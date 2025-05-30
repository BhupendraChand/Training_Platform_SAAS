import app from "./src/app";
import { config } from "dotenv";
config()



import  "./src/database/connection";
function startServer(){
    const port = process.env.PORT 
    app.listen(port,function(){
        console.log(`Server is Started. ${port}`)
    })
}

startServer()