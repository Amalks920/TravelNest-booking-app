import { useParams } from "react-router-dom";
import FilterSection from "./FilterSection";
import HotelListSection from "./HotelListSection";
import useGetSearchHotels from "../hooks/useGetSearchHotels";
import { useDispatch, useSelector } from "react-redux";
import { selectCheckIn, selectCheckOut, selectLocation, selectPriceRange, selectRoomType, selectSearchResult, updateSearchResult } from "../../../services/searchSlice";
import { useEffect, useState } from "react";
import { useSearchByLocationMutation } from "../services/searchApiSlice";
import EmptyHotelPage from "./EmptyHotelPage";

const SearchContainer = () => {
  

  const dispatch=useDispatch()  
  const location=useSelector(selectLocation)
  const checkIn=useSelector(selectCheckIn)
  const checkOut=useSelector(selectCheckOut)
  const roomType=useSelector(selectRoomType)
  const data=useSelector(selectSearchResult)
  const priceRange=useSelector(selectPriceRange)


  const [searchByLocation,{isError,isLoading,isSuccess}]=useSearchByLocationMutation({location,checkIn,checkOut})



  return (
    <div className="grid grid-rows-[100vh] grid-cols-[20%,auto]  w-full min-h-[80vh] gap-[5%]">
      <div className="lg:block hidden row-span-1 col-span-1 rounded-md min-h-[80vh]  ">
       <FilterSection />
      </div>

    
      <div className="row-span-1 col-span-2 lg:col-span-1 overflow-scroll" style={{scrollbarWidth:'none'}}>
      
     {
      data.length===0 ?
      (
      <EmptyHotelPage/>
      ):
      data?.map((hotel,index)=>{
        
        return <HotelListSection key={index}  hotel={hotel}/>
      })
     }
        
      </div>
    </div>
  );
};

export default SearchContainer;
