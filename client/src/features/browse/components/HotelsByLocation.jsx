import { useParams } from "react-router-dom";
import Cards from "./Cards";
import { useFilterAllRoomsByLocationQuery } from "../services/getAllHotelsApiSlice";



const HotelsByLocation=()=>{

    const {location}=useParams();


    const {data:hotels,isError,isFetching,isLoading}=useFilterAllRoomsByLocationQuery({location})
    console.log(hotels)
    return (
<div className="flex justify-between flex-wrap">


   { 
   hotels?.response?.map((hotel,index)=>{
    console.log(hotel)

 return   <Cards text={hotel?.hotelName} images={hotel?.images}/>

})
   }
    
</div>
    )
}

export default HotelsByLocation;