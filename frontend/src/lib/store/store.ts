
import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user.slice';
import studentSlice from './student.slice'
import teacherSlice from './teacher.slice'

const store = configureStore({
    reducer : {
        user : userSlice, 
        student: studentSlice, 
        teacher: teacherSlice
    }
})

export default store 
export type AppDispatch =  typeof store.dispatch // useDispatch lai type dina chayenxa 
export type RootState = ReturnType<typeof store.getState> // useSelector lai type dina chayenxa
// differents hook provide garxa :useSelector (), useDispatch()