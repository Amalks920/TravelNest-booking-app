import { apiSlice } from "../../../services/apiSlice";


const getHotelAndRoomDetail=apiSlice.injectEndpoints({
    endpoints:builder({
        getHotelAndRooms
    })
})