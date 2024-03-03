import { createSlice } from "@reduxjs/toolkit";

const initialState={
        hotelName:"",
        location:null,
        description:null,
        images:null
    }

const EditFormSlice=createSlice({
    name:'EditHotelSlice',
    initialState,
    reducers:{
        updateEditHotelFormSlice:(state,action)=>{
            state.hotelName=action.payload.hotelName
            state.location=action.payload.location
            state.description=action.payload.description
            state.images=action.payload.images
        },
        updateHotelName:(state,action)=>{
            state.hotelName=action.payload
        },
        updateLocation:(state,action)=>{
            state.location=action.payload
        },
        updateDescription:(state,action)=>{
            state.description=action.payload
        },
        updateImage:(state,action)=>{
            state.images=action.payload
        }
    }
})


export const {updateDescription,updateHotelName,updateImage,updateLocation,updateEditHotelFormSlice} =EditFormSlice.actions 

export const selectHotelName=(state)=>state.editHotelForm.hotelName
export const selectLocation=(state)=>state.editHotelForm.location
export const selectDescription=(state)=>state.editHotelForm.description
export const selectImages=(state)=>state.editHotelForm.images

export default EditFormSlice.reducer