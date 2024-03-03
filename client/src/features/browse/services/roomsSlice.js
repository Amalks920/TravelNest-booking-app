import { createSlice } from "@reduxjs/toolkit";

const initialState={
    rooms:[]
}

const roomsInHotelSlice=createSlice({
name:'roomsInHotel',
initialState,
reducers:{
    updateRooms:(state,action)=>{
       state.rooms=action.payload
    }
}
})


export const selectRooms=(state)=>state.roomsInHotel.rooms;

export const {updateRooms}=roomsInHotelSlice.actions
export default roomsInHotelSlice.reducer
