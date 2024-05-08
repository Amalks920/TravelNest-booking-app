import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchMutation } from "../services/searchApiSlice";
import { selectRoomType, updateAllDetails } from "../../../services/searchSlice";
import { updateCheckIn,updateCheckOut,updateLocation, updateSearchResult,updateRoomType } from "../../../services/searchSlice";
import { Spinner } from "@material-tailwind/react";
import { getFutureDateString, getYesterdayDateString } from "../../../utils/formatDate";

const SearchSectionHome = () => {
  const [checkIn, setCheckInDate] = useState(null);
  const [checkOut, setCheckOutDate] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const [roomType,setRoomType]=useState(null);
  const [isSearching,setIsSearching]=useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, { isError, isLoading, isSuccess, reset }] =
    useSearchMutation();

const handleSubmit=async () => { 
    const searchResult=await search({location:searchString, checkIn: checkIn, checkOut: checkOut, roomType: roomType})
    console.log(searchResult)
    dispatch(updateSearchResult(searchResult.data.response))

    dispatch(updateAllDetails({location:searchString, checkIn: checkIn, checkOut: checkOut, roomType: roomType}))
    handleSearch()
}

  const handleSearch = async () => {
    navigate(`/search-page`);
  };


  return (
    <>
      <h2 className="text-white capitalize font-bold sm:text-[1.1rem] xl:text-[1.5rem]  text-[0.8rem]    text-center mb-4">
        Over 174,000+ hotels and homes across 35+ countries
      </h2>
      <div 
        className="grid sm:grid-cols-[35%,15%,15%,15%,20%] grid-cols-[25%,20%,20%,15%,20%]  grid-rows-1 border-2 sm:w-[90%] md:w-[90%] w-[90%] sm:h-1/4 h-1/4 2xl:w-[70%] rounded-md brightness-95">
        <input
          onChange={(e) => {
            updateLocation(e.target.value)
            setSearchString(e.target.value);
          }}
          value={searchString}
          onFocus={()=>{
            setIsSearching(!isSearching)
          }}
          onBlur={()=>{
            setIsSearching(!isSearching)
          }}
          className="sm:ps-3 ps-1    sm:text-[1.1rem]  text-[0.4rem]  capitalize focus:font-bold focus:border-2 border-black"
          placeholder="Search by location"
        />
        <div className="absolute right-[66%] top-[28%]"> 
        {isSearching  ? 
        <svg 
        onClick={()=>{
          setSearchString('')
          updateLocation('')
        }}
         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      
        :null}
         </div>
        <input
          onChange={(e) => {
            console.log(e.target.value)
            console.log('e.target.value')
            dispatch(updateCheckIn(e.target.value))
            setCheckInDate(e.target.value);
          }}
          type="date"
          min={getYesterdayDateString()}
          max={checkOut || getFutureDateString(10)}
          className="ps-3 sm:text-[1rem] text-[0.5rem]  focus:border-2  border-black"
        />
        <input
          onChange={(e) => {
            dispatch(updateCheckOut(e.target.value))
            setCheckOutDate(e.target.value);
          }}
          type="date"
          min={ checkIn || getYesterdayDateString()}
          max={ getFutureDateString(10)}
          className="ps-3 sm:text-[1rem] text-[0.5rem]  focus:border-2 border-black"
        />

        <select
          value={roomType}
          onChange={e => {
            dispatch(updateRoomType(e.target.value))
            setRoomType(e.target.value)
          }} 
          className="ps-2 pe-3 sm:text-[1rem] text-[0.5rem] text-gray-500 bg-white  font-extralight"
          name=""
          id=""
        >
          <option value='' selected disabled>select room type</option>
          <option value="single" className="text-black">single</option>
          <option value="double" className="text-black">double</option>
          <option value="suite" className="text-black">suite</option>
          <option value="family" className="text-black">family</option>
          <option value="presidential" className="text-black">presidential</option>
        </select>

        <button
        onClick={()=>{
            handleSubmit()
        }}
         type="submit" className="bg-green-600 rounded-md hover:bg-green-800 text-white sm:text-[1rem] text-[0.4rem] font-bold uppercase">
          Search
        </button>
      </div>
    </>
  );
};

export default SearchSectionHome;
