import { Request } from "express";



export interface IExtendedRequest extends Request{
       user ?: {
              

              id ?:number | string,
             currentInstituteNumber: number | string;

               username: string
                
       }
          instituteNumber?: number | string
       // },
       
}