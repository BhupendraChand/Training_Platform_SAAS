import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const teacherSlice=createSlice({
    name: "teacherSlice",
    initialState: {
        teacherName:"",
        teacherPassword:""
    },
    reducers:{
        /// state is initialState and action garna  trigger garna 
        setTeacherName: (state, action: PayloadAction<string>) => {
            state.teacherName = action.payload;
        },
        setTeacherPassword: (state, action: PayloadAction<string>) => {
            state.teacherPassword = action.payload;
        }
    }

})

const {setTeacherName,setTeacherPassword} = teacherSlice.actions.setTeacherName, setTeacherPassword();



action:{
    setTeacherName:(){},
    setTeacherPassword:(){}
}