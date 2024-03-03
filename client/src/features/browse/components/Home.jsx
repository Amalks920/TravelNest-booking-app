import { useDispatch, useSelector } from "react-redux";
import XXLDialog from "../../../components/modals/XXLDialog";
import useGetAllHotels from "../hooks/useGetAllHotels";
import Cards from "./Cards";
import {
  selectIsSearchBarOpen,
  updateSearchResult,
} from "../../../services/searchSlice";
import { Button } from "@material-tailwind/react";
import SearchSection from "./SearchSection";
import { HotelCardSkeleton } from "./HotelCardSkeleton";
import { useState } from "react";
import SearchSectionHome from "./SearchSectionHome";
import { useSearchMutation } from "../services/searchApiSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllRoomsLocationMutation } from "../services/getAllHotelsApiSlice";
import { IMAGE_BASE_URL } from "../../../data/constants";

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
  const [hotelLocation,setLocation]=useState(0)

  const handleSearch = async () => {
    navigate(`/search-page`);
  };

  return (
    <div className=" grid grid-flow-row grid-cols-1 md:grid-cols-4 xl:grid-cols-3 min-h-[100vh] w-[100vw] bg-gray-100">
      <div
        className="absolute row-span-1 h-[270px] col-span-full w-[100vw]  bg-cover flex flex-col justify-center items-center -ms-2 -mt-5"
        style={{
          backgroundImage: `url(${"https://assets.oyoroomscdn.com/cmsMedia/115d178d-ef59-4212-a6ed-953eb4ce8241.jpg"})`,
        }}
      >
        <SearchSectionHome />
      </div>

      <div
        className="row-span-1 h-[300px] mt-[300px] ms-[90px] border-2 col-span-full w-[90%] bg-cover mb-[7%]"
        style={{
          backgroundImage: `url(${"https://assets.oyoroomscdn.com/cmsMedia/6e9d9804-9c6f-4b18-a5d5-5e9a8f9815e5.jpg"})`,
        }}
      ></div>
      <div className="row-span-1 col-span-full  min-h-[50vh]">
        <h1 className="text-center font-bold text-[1.3rem] mb-10"> Locations</h1>
        <div className="w-[91%]  h-[70%] ms-[5%] rounded-lg shadow-md border-2 bg-white">
          
          <div className="border-b-2 h-[60px]  gap-4 justify-left items-center px-[50px] hidden">

            {/* <h2 className="font-bold text-[1.3rem] text-center w-full my-3">Popular Locations</h2> */}
            {location?.map(({ _id, hotelImages }, index) => {
              return <h2
              onClick={()=>{
                console.log(_id)
                setLocation(_id)
              }}
               className={`capitalize cursor-pointer  text-[1.1rem] ${hotelLocation===index? 'border-b-4 border-black font-bold':null}
                text-center   w-full h-[100%] pt-4`}>{_id}</h2>;
            })}
          </div>

            <div className="flex gap-4 justify-left items-center px-[50px] mb-4">
          {location?.map(({ _id, hotelImages }, index) => {
           
            return   <div className=" text-center  w-full h-[100%] pt-4 cursor-pointer" >
              <div className="w-[80%] h-[170px] bg-cover rounded-md" style={{backgroundImage:`url(${IMAGE_BASE_URL+'/'+hotelImages[0][0]})`}}></div>
            </div>
          
        })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
