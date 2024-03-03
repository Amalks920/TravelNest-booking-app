import { createSlice } from "@reduxjs/toolkit";



const hotelListSlice=createSlice({

    name:'hotels',
    initialState:{
        hotels:{},
        rooms:{}
    },
    reducers:{
        addHotels:(state,action)=>{
            state.hotels=action.payload
        },
        addRooms:(state,action)=>{
            state.rooms=action.payload
        }
    }

})


export const {addHotels,addRooms}=hotelListSlice.actions
export const selectHotelById=(state,id)=>state?.persistedSlice?.hotels?.hotels?.filter(hotel=>hotel._id===id);
export const selectRoomById=(state,id)=>state?.persistedSlice?.hotels?.rooms?.filter(room=>room._id===id);

export default hotelListSlice.reducer