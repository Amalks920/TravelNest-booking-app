import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchMutation } from "../services/searchApiSlice";
import { selectRoomType, updateAllDetails } from "../../../services/searchSlice";
import { updateCheckIn,updateCheckOut,updateLocation, updateSearchResult,updateRoomType } from "../../../services/searchSlice";

const SearchSectionHome = () => {
  const [checkIn, setCheckInDate] = useState(null);
  const [checkOut, setCheckOutDate] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const [roomType,setRoomType]=useState(null)

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

  const getYesterdayDateString = () => {
    const yesterday = new Date();
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getFutureDateString = (daysAhead) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const day = String(futureDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  return (
    <>
      <h2 className="text-white capitalize font-bold sm:text-[2.2rem]     text-center mb-4">
        Over 174,000+ hotels and homes across 35+ countries
      </h2>
      <div 
        className="grid grid-cols-[35%,15%,15%,15%,20%] grid-rows-1 border-2 w-[70%] sm:h-1/4  h-1/5 rounded-md brightness-95">
        <input
          onChange={(e) => {
            updateLocation(e.target.value)
            setSearchString(e.target.value);
          }}
          className="ps-3 sm:text-[1.1rem] text-[0.8rem]  capitalize focus:font-bold focus:border-2 border-black"
          placeholder="Search by location"
        />
        <input
          onChange={(e) => {
            dispatch(updateCheckIn(e.target.value))
            setCheckInDate(e.target.value);
          }}
          type="date"
          min={getYesterdayDateString()}
          max={checkOut || getFutureDateString(10)}
          className="ps-3 text-[1rem]  focus:border-2  border-black"
        />
        <input
          onChange={(e) => {
            dispatch(updateCheckOut(e.target.value))
            setCheckOutDate(e.target.value);
          }}
          type="date"
          min={ checkIn || getYesterdayDateString()}
          max={ getFutureDateString(10)}
          className="ps-3 text-[1rem]  focus:border-2 border-black"
        />

        <select
          value={roomType}
          onChange={e => {
            dispatch(updateRoomType(e.target.value))
            setRoomType(e.target.value)
          }} 
          className="ps-2 pe-3 text-[1rem] text-gray-500 bg-white  font-extralight"
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
         type="submit" className="bg-green-600 rounded-md hover:bg-green-800 text-white sm:text-[1.4rem] text-[0.6rem] font-bold uppercase">
          Search
        </button>
      </div>
    </>
  );
};

export default SearchSectionHome;
