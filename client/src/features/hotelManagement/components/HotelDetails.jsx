
// two more components 
import { useParams } from "react-router-dom";
import HotelDetailsSection from "./HotelDetailsSection";
import RoomDetailsSection from "./RoomDetailsSection";


// hotel details section 


// room details section


const HotelDetails=()=>{
    const {hotel_id}=useParams()




   return ( 
   <div className="flex flex-col flex-grow m-[5%]">
   <div className="border-2">
    <HotelDetailsSection  hotel_id={hotel_id}/>
    </div> 

    <div className="border-2 mt-[100px]">

        <div>
        <RoomDetailsSection hotel_id={hotel_id}/>
        </div>
        </div>
    </div>
   )
}

export default HotelDetails;