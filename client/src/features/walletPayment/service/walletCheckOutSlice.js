import { createSlice } from "@reduxjs/toolkit";


const initialState={
    checkoutDetails:[{}]
}

const walletCheckOutSlice=createSlice({
    name:'checkout',
    initialState,
    reducers:{
        updateCheckOutDetails:(state,action)=>{
            state.checkoutDetails=action.payload;
        },

        removeCheckOutDetails:(state)=>{
            state.checkoutDetails=[{}]
        }
    }
});

export const selectCheckOutDetails=(state)=>state.persistedSlice.checkout.checkoutDetails;
export default walletCheckOutSlice.reducer;
export const {removeCheckOutDetails,updateCheckOutDetails}=walletCheckOutSlice.actions;