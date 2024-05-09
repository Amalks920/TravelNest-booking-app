
import useGetAllHotels from "../hooks/useGetAllHotels";

import { Spinner } from "@material-tailwind/react";
import SearchSectionHome from "./SearchSectionHome";
import { HOME_PAGE_IMAGE, OFFER_IMAGE } from "../../../data/constants";
import LocationWiseHotels from "./LocationWiseHotels";

const Home = () => {



  const {
    location,
    isLoading,
  } = useGetAllHotels();


  if(isLoading) return <Spinner/>

  return (
    <div className=" grid grid-flow-row grid-cols-1 md:grid-cols-4 xl:grid-cols-3 min-h-[100vh] w-[100vw] bg-gray-100">
      <div
        className="absolute row-span-1 sm:h-[180px] h-[150px] md:h-[200px] xl:h-[260px]  col-span-full w-[100vw]  bg-cover flex flex-col justify-center items-center -ms-2 -mt-5 "
        style={{
          backgroundImage: `url(${HOME_PAGE_IMAGE})`,
        }}
      >
        <SearchSectionHome />
      </div>


      <div
        className="row-span-1 xl:h-[230px] sm:h-[130px] sm:ms-[5%] 2xl:mt-[300px] 
          2xl:h-[300px] md:h-[150px] md:ms-[5%]  h-[60px] sm:mt-[200px] mt-[150px]  ms-[15px] border-2 col-span-full w-[90%] bg-cover mb-[7%]"
        style={{
          backgroundImage: `url(${OFFER_IMAGE})`,
        }}
      ></div>
      <div className="row-span-1 col-span-full sm:ms-[10%] ms-[7%] sm:-mt-0 -mt-[64%]">
        
        <LocationWiseHotels location={location}  />
      </div>
    </div>
  );
};

export default Home;
