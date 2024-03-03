import { createSlice } from "@reduxjs/toolkit";



const verifyEmailSlice=createSlice({
    name:'verifyEmail',
    initialState:{
        response:{}
    },
    reducers:{
        sendEmail:(state,action)=>{

        }
    }
})


export const {sendEmail}=verifyEmailSlice.actions;

export default verifyEmailSlice.reducer;