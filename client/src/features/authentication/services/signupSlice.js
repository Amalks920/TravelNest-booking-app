import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { BASE_URL } from "../../../data/constants";
import axios from "axios";


let initialState={
    status:'idle',
    data:{},
    error:null
}



export const createUser=createAsyncThunk('signup/createUser',async  (data)=>{
      const response = await axios.post(`${BASE_URL}/auth/signup`,data)
      return response.data.response
   // return await response.data
})




const signupSlice=createSlice({
   name:'signup',
   initialState,
   reducers:{
    signup:(state,action)=>{
        console.log(state.data)
        state.data=action.payload
    }
   }, 

   extraReducers(builder){
    builder.
    addCase(createUser.pending,(state,action)=>{
        state.status='pending'
    })
    .addCase(createUser.fulfilled,(state,action)=>{
        state.status='succeeded'
    })
    .addCase(createUser.rejected,(state,action)=>{
        console.log(action)
        state.status='failed',
        state.error=action.error.message
    })
   }
})


export const selectData = (state) => state.signup.data;
export const getSignupStatus = (state) => state.signup.status;
export const getSignupError = (state) => state.signup.error;

export const { signup } = signupSlice.actions
export default signupSlice.reducer