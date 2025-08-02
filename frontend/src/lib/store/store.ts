

// collect all slices and store 

import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth/auth.slice'
import teacherSlice from './teacher/teacher.slice'
import instituteSlice from './institute/institute.slice'
import categorySlice from './institute/category/category.slice'
import courseSlice from './institute/course/institute-course-slice'
import instituteTeacherSlice from './institute/teacher/institute-teacher.slice'

const store = configureStore({
    reducer : {
        auth : authSlice, 
        teacher : teacherSlice, 
        institute : instituteSlice,
        category : categorySlice, 
        course : courseSlice, 
        instituteTeacher : instituteTeacherSlice
    }
})



export default store 

// dispatch ko type --> paxi kaam lagxa hamilai 
// dispatch(setName()) --> dispatch() : AppDispatch
export type AppDispatch =  typeof store.dispatch // useDispatch lai type dina chayenxa 
export type RootState = ReturnType<typeof store.getState> // useSelector lai type dina chayenxa

// react-redux -- package 
// next - reduxToolkit 

// differents hook provide garxa :useSelector (), useDispatch()