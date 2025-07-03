


// collect all slices and store 

import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user.slice';
import studentSlice from './student.slice'


const store = configureStore({
    reducer : {
        userSlice : userSlice, 
        studentSlice : studentSlice, 
        teacherSlice : 
    }
})



export default store 

export type AppDispatch =  typeof store.dispatch

// differents hook provide garxa :useSelector (), useDispatch()