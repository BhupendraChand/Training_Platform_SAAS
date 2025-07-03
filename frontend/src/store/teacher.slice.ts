import { createSlice } from '@reduxjs/toolkit';
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
        }
    }
})




const {setTeacherName,setTeacherPassword} = teacherSlice.actions

export default teacherSlice.reducer;
export {setTeacherName,setTeacherPassword}

