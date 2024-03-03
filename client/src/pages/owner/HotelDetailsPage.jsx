import { lazy } from "react";

const HotelDetails=lazy(()=>import('../../features/hotelManagement/components/HotelDetails'))


const HotelDetailsPage=()=>{
       return  <HotelDetails/>
}

export default HotelDetailsPage;