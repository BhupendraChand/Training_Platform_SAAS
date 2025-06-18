import {Request,Response,NextFunction} from 'express';

const asyncErrorHandler=(fn:Function)=>
{
    return(req:Request,res:Response,next:NextFunction)=>{
fn(req,res,next).catch((error:Error)=>{
     console.log(error, "ERROR")
    return res.status(500).json({
        message: error.message ,
       fullError: error

    })
})
    }
}

   
   

export default asyncErrorHandler;