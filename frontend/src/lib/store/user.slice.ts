import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInitialState } from "./types";
import API from "../http";


const userInitialState : IUserInitialState =  {
        name : null, 
        address : null
    }

const userSlice = createSlice({
    name : "userSlice", 
    initialState : userInitialState, 
    reducers : {
     
        setName(state:IUserInitialState,action:PayloadAction<string>){
         state.name = action.payload
        },

        setAddress(state:IUserInitialState,action:PayloadAction<string>){
          state.address =  action.payload
        }
      
    }
})




// action 
const {setName,setAddress,sethehe} = userSlice.actions
export default userSlice.reducer 
export {setName,setAddress,sethehe}


// register user 
 function registerUser(data){
 return async function registerUserThunk(){
 try {
     const response = await API.post("user/register",data)
    if(response.status === 200){
        dispatch(setName(response.data.data.name))
  }else{

  }
 } catch (error) {
    console.log(error)
 }
 }
}
//login user 

function loginUser(){
return async function loginUserThunk(){
try {
    const response = await API.post("user/login")
if(response.status === 200){

}else{

}
} catch (error) {
    console.log(error)
}
}
}
