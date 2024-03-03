import { useEffect, useRef, useState } from "react";
import { useSearchByLocationMutation } from "../services/searchApiSlice";
import { useSelector } from "react-redux";
import { selectCheckIn, selectCheckOut, selectLocation, selectPriceRange, selectRoomType } from "../../../services/searchSlice";



const useGetSearchHotels= async ()=>{
   
const searchResult=useRef(null)
const location=useSelector(selectLocation)
const checkIn=useSelector(selectCheckIn)
const checkOut=useSelector(selectCheckOut)
const roomType=useSelector(selectRoomType)
const priceRange=useSelector(selectPriceRange)

const [searchByLocation,{isError,isLoading,isSuccess}]= useSearchByLocationMutation({location})
console.log(priceRange)
useEffect(()=>{
   
    handleSearch()
},[location,checkIn,checkOut,roomType,priceRange])


const handleSearch=async ()=>{
    try {
        const response=await searchByLocation({location,checkIn,checkOut,roomType,priceRange})
        searchResult.current=response
    } catch (error) {
        console.log(error)
    }
}
console.log(searchResult)

return {
    data:searchResult.current.data.response,
    isError,
    isLoading,
    isSuccess
}
}

export default useGetSearchHotels;