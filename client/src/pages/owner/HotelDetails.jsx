import RoomDetails from "../../features/hotelManagement/components/RoomsDetails";
import SingleHotelDetails from "../../features/hotelManagement/components/SingleHotelDetails";

const HotelDetails=()=>{
    
    return(
        <div className="flex flex-col w-full justify-center items-center my-32 ">
        <div className="w-[90%]">
            <h1 className="text-center">Hotel Details</h1>
            <SingleHotelDetails/>
        </div>
        <div className="w-[90%]">
            <h1 className="text-center">Room Details</h1>
            <RoomDetails/>
        </div>
        </div>
    ) 
}

export default HotelDetails;