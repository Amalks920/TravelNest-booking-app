import { lazy } from "react";

const HotelList=lazy(()=>import("../../features/hotelManagement/components/HotelList"))
//import HotelList from "../../features/hotelManagement/components/HotelList"


const HotelListPage=()=>{

    return (
        <HotelList/>
    )
}

export default HotelListPage;