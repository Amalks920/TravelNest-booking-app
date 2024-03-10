import { useDispatch, useSelector } from "react-redux";
import XXLDialog from "../../../components/modals/XXLDialog";
import useGetAllHotels from "../hooks/useGetAllHotels";
import Cards from "./Cards";
import {
  selectIsSearchBarOpen,
  updateCheckIn,
  updateLocation,
  updatePriceRange,
  updateRoomType,
  updateSearchResult,
} from "../../../services/searchSlice";
import { Button, Spinner } from "@material-tailwind/react";
import SearchSection from "./SearchSection";
import { HotelCardSkeleton } from "./HotelCardSkeleton";
import { useEffect, useState } from "react";
import SearchSectionHome from "./SearchSectionHome";
import { useSearchMutation } from "../services/searchApiSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllRoomsLocationMutation } from "../services/getAllHotelsApiSlice";
import { IMAGE_BASE_URL } from "../../../data/constants";
import LocationWiseHotels from "./LocationWiseHotels";
import { updateCheckOut } from "../services/priceSlice";

const Home = () => {
  const isSearchBarOpen = useSelector(selectIsSearchBarOpen);
  const {
    hotels,
    location,
    isError,
    isFetching,
    isLoading,
    isUninitialized,
    error,
  } = useGetAllHotels();

  const [
    getAllRoomsLocation,
    {
      isError: isErrorRoomByLocation,
      isLoading: isLoadingRoomByLocation,
      isFetching: isFetchingRoomByLocation,
    },
  ] = useGetAllRoomsLocationMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(()=>{
    dispatch(updateCheckIn(null))
    dispatch(updateCheckOut(null))
    dispatch(updateLocation(null))
    dispatch(updateRoomType(null))
    dispatch(updatePriceRange(null))
    dispatch(updateSearchResult([]))
  },[])

  const handleSearch = async () => {
    navigate(`/search-page`);
  };

  if(isLoading) return <Spinner/>

  return (
    <div className=" grid grid-flow-row grid-cols-1 md:grid-cols-4 xl:grid-cols-3 min-h-[100vh] w-[100vw] bg-gray-100">
      <div
        className="absolute row-span-1 sm:h-[270px] h-[150px]  col-span-full w-[100vw]  bg-cover flex flex-col justify-center items-center -ms-2 -mt-5 "
        style={{
          backgroundImage: `url(${"https://assets.oyoroomscdn.com/cmsMedia/115d178d-ef59-4212-a6ed-953eb4ce8241.jpg"})`,
        }}
      >
        <SearchSectionHome />
      </div>

      <div
        className="row-span-1 sm:h-[300px] h-[60px] sm:mt-[300px] mt-[150px] sm:ms-[90px] ms-[15px] border-2 col-span-full w-[90%] bg-cover mb-[7%]"
        style={{
          backgroundImage: `url(${"https://assets.oyoroomscdn.com/cmsMedia/6e9d9804-9c6f-4b18-a5d5-5e9a8f9815e5.jpg"})`,
        }}
      ></div>
      <div className="row-span-1 col-span-full sm:ms-[10%] ms-[7%] sm:-mt-0 -mt-[64%]">
        {/* <h2 className="text-center font-bold text-[1.3rem] mb-10"> Locations</h2> */}

        <LocationWiseHotels location={location}  />
      </div>
    </div>
  );
};

export default Home;
