import { useParams } from "react-router-dom";
import Cards from "./Cards";
import { useFilterAllRoomsByLocationQuery } from "../services/getAllHotelsApiSlice";



const HotelsByLocation=()=>{

    const {hotelName}=useParams();

    const {data:hotels,isError,isFetching,isLoading}=useFilterAllRoomsByLocationQuery({hotelName})

    return (
<div className="grid grid-cols-3 grid-flow-row w-[90%] place-items-center gap-12 mt-[5%] rounded-lg mb-[9%]">


   { 
   hotels?.response?.map((hotel,index)=>{
    console.log(hotel)
        return  <Cards
         text={hotel?.hotelName} 
         rate={hotel?.rate}
         roomType={hotel?.roomType}
         room_id={hotel?._id}
         hotel_id={hotel?.hotel_id}
         images={hotel?.images}/>
})
   }
    
</div>
    )
}

export default HotelsByLocation;