import { createSlice, PayloadAction } from '@reduxjs/toolkit';

createSlice({
    name: "userSlice",
    initialState: {
        name:"romeo",
        address:"ktm"
    },
    reducers:{
        /// state is initialState and action garna  trigger garna 
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        }
    }



})