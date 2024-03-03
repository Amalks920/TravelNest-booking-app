import { createSlice } from "@reduxjs/toolkit";

const initialState={
        roomType:"",
        noOfRooms:null,
        amenities:null,
        rate:null,
        size:null,
        bathroomType:null,
        description:null,
        images:null
    }

export const editRoomFormSlice=createSlice({
    name:'editRoomForm',
    initialState,
    reducers:{
        updateEditRoomFormSlice:(state,action)=>{
            state.roomType=action.payload.roomType
            state.noOfRooms=action.payload.noOfRooms
            state.amenities=action.payload.amenities
            state.rate=action.payload.rate
            state.size=action.payload.size
            state.bathroomType=action.payload.bathroomType
            state.description=action.payload.description
            state.images=action.payload.images
        },
        updateRoomType:(state,action)=>{
            state.roomType=action.payload
        },
        updateNoOfRooms:(state,action)=>{
            state.noOfRooms=action.payload.noOfRooms
        },
        updateAmenities:(state,action)=>{
            state.amenities=action.payload
        },
        updateRate:(state,action)=>{
            state.rate=action.payload.rate
        },
        updateSize:(state,action)=>{
            state.size=action.payload.size
        },
        updateBathroomType:(state,action)=>{
            state.bathroomType=action.payload.bathroomType
        },
        updateDescription:(state,action)=>{
            state.description=action.payload
        },
        updateImage:(state,action)=>{
            state.images=action.payload
        }
    }
})


export const {updateDescription,updateHotelName,updateImage,updateLocation,updateEditRoomFormSlice} =editRoomFormSlice.actions 

export const selectRoomType=(state)=>state.editRoomForm.roomType
export const selectNoOfRooms=(state)=>state.editRoomForm.noOfRooms
export const selectAmenities=(state)=>state.editRoomForm.amenities
export const selectRate=(state)=>state.editRoomForm.rate
export const selectSize=(state)=>state.editRoomForm.size
export const selectBathroomType=(state)=>state.editRoomForm.bathroomType
export const selectDescription=(state)=>state.editRoomForm.description
export const selectImages=(state)=>state.editHotelForm.images

export default editRoomFormSlice.reducer