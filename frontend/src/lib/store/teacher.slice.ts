import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const teacherSlice  = createSlice({
    name : "teacherSlice", 
    initialState : {
        teacherName : "", 
        teacherPassword : "", 
    }, 
    reducers : {
        setTeacherName(state,action){
            state.teacherName = "ram"
        }, 
        setTeacherPassword(state,action){
            state.teacherPassword = "ram123"
        },
          sethehe(state,action){

        }
    }
})




const {setTeacherName,setTeacherPassword} = teacherSlice.actions

export default teacherSlice.reducer;
export {setTeacherName,setTeacherPassword}


function registerTeacher(){
    return async function registerTeacherThunk(){
        axios.post("")
    }
}