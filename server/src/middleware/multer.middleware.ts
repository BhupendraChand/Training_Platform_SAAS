import { Request,Response } from 'express';

import multer from 'multer';

const storage = multer.diskStorage({
    destination:function(Request, file:Express.Multer.File,cb:any) {
 
        cb(null,'./src/storage');   
    },
    filename:  function(Request, file:Express.Multer.File,cb:any){
          cb(null,Date.now()+""+ file.originalname);
    }
    });


    export {multer,storage};