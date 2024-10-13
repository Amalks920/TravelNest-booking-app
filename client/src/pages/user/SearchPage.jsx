import { Button, Input, Rating } from "@material-tailwind/react"
import SearchBar from "../../features/browse/components/SearchBar"
import { SelectInput } from "./SelectInput"
import { useSelector } from "react-redux"
import { selectCheckIn, selectCheckOut, selectIsResultLoading, selectPriceRange, selectSearchResult } from "../../services/searchSlice"
import { IMAGE_BASE_URL } from "../../data/constants"
import { Link } from "react-router-dom"
import { useSearchMutation } from "../../features/browse/services/searchApiSlice"

const SearchPage=()=>{

    const data =useSelector(selectSearchResult)
    const checkIn=useSelector(selectCheckIn)
    const checkOut=useSelector(selectCheckOut)
    const isLoading=useSelector(selectIsResultLoading)

    //console.log(searchResult)
    return (
        <div className="w-full flex flex-col items-center gap-5">

         <div className="w-[64.8%]">
            <SearchBar/>
         </div>

         <div className="py-[20px]  w-[64.8%]">
         <div className="w-1/5">
        <SelectInput/>
    </div>

         </div>


         <div className="w-full h-fit flex flex-col items-center gap-5 bg-gray-200 py-10">


            {
                
               !isLoading? data?.map((hotel,index)=>{
                        return (
                            <div className="w-[64.8%] flex shadow-gray-600 rounded-2xl bg-white">
                            <div className="w-[28%]">
                                <img src={IMAGE_BASE_URL+'/'+hotel.images[0]} alt="" className="rounded-s-2xl" />
                            </div>
                            <div className="w-[47%] flex flex-col gap-2 px-2">
                                <h1 className="font-bold font-custom text-lg  pt-4">{hotel?.hotelName}</h1>
                                <div className="flex">
                                    <Rating value={4}/>
                                    </div>

                                    <p className="line-clamp-2 font-custom text-sm">{hotel?.description}</p>
                            </div>
                            <div className="w-[25%]">
                                <div className="flex justify-between items-end border-[0.01rem] border-green-800
                                 rounded-md bg-green-50 h-2/3 m-2  px-3 pb-2">
                                    <h1 className="font-custom font-bold text-xl">₹{hotel?.rate}</h1>
                                    <Link  className="h-1/4 rounded-md w-1/2" to={`/hotel-details/${hotel?.hotel_id}/${hotel?._id}/${checkIn}/${checkOut}`}>View Deal</Link>
                                </div>
                                <div></div>
                            </div>
                        </div>
                        )
                }):
                (
                    <div className="w-[64.8%] flex shadow-gray-600 rounded-2xl bg-white animate-pulse">
      {/* Image Skeleton */}
      <div className="w-[28%]">
        <div className="h-32 bg-gray-300 rounded-s-2xl"></div>
      </div>

      {/* Hotel Info Skeleton */}
      <div className="w-[47%] flex flex-col gap-2 px-2">
        <div className="h-6 w-3/4 bg-gray-300 rounded mt-4"></div>
        {/* Rating Skeleton */}
        <div className="h-4 w-16 bg-gray-300 rounded"></div>

        {/* Description Skeleton */}
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-11/12 bg-gray-300 rounded"></div>
      </div>

      {/* Price and Button Skeleton */}
      <div className="w-[25%]">
        <div className="flex justify-between items-end border-[0.01rem] border-green-800 rounded-md bg-green-50 h-2/3 m-2 px-3 pb-2">
          {/* Price Skeleton */}
          <div className="h-6 w-1/3 bg-gray-300 rounded"></div>

          {/* Button Skeleton */}
          <div className="h-8 w-1/2 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  

                )
            }

{/* 
<div className="grid grid-rows-[100vh] grid-cols-[20%,auto]  w-full min-h-[80vh] gap-[5%]">


    
      <div className="row-span-1 col-span-2 lg:col-span-1 overflow-scroll" style={{scrollbarWidth:'none'}}>
      
     {
      data.length===0 ?
      (
        <div>empty...</div>
      ):
      data?.map((hotel,index)=>{
        
        return (
            <div className="" >
            <div className="grid grid-flow-row grid-cols-[35%,10%,55%] mb-14 h-[300px] m-[5%]  p-2 border-2" >
              <div
                className="col-span-1  max-h-[300px] bg-no-repeat bg-cover rounded-sm"
                style={{
                  backgroundImage: `url(${IMAGE_BASE_URL}/${hotel?.images[1]})`,
                }}
              ></div>
      
              <div className="border-2 flex flex-col gap-1 px-1  ">
                {hotel?.images.slice(0, 3).map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="h-1/3 pb-3 overflow-scroll bg-cover bg-no-repeat rounded-sm"
                      style={{ backgroundImage: `url(${IMAGE_BASE_URL}/${image})` }}
                    ></div>
                  );
                })}

              </div>
              <div className="border-2 p-5 flex flex-col justify-between flex-grow-0">
                <div>
                  <div className="flex justify-between">
                  <h2 className="text-xl  text-[0.5rem] md:text-[1rem]">{hotel?.hotelName}</h2>
                  <h2 className="font-bold capitalize">{hotel?.roomType}</h2>
                  </div>
                  <p className="text-[0.9rem] mt-2 ps-1 font-light">
                    {hotel?.location}
                  </p>
                </div>
      
                <div className=" flex justify-end">
                  <div className="font-bold text-[0.9rem]">{"₹ " + hotel?.rate}</div>
                </div>
                <div className="flex justify-between">
                  <div className="max-w-[200px] overflow-hidden text-[0.7rem]">
                    {hotel?.description.slice(0, 100)}
                  </div>
                  <div>
                    <Link to={`/hotel-details/${hotel?.hotel_id}/${hotel?._id}/${checkIn}/${checkOut}`}>
                      <Button
                      onClick={()=>{
                        updatePrice(Number(hotel?.rate))
                        updateNoOfRooms(1)
                      }}
                        size="sm"
                        className="bg-white border-2 border-gray-600 px-4 py-2 text-gray-500 font-light text-[0.6rem]"
                      >
                        view details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
     }
        
      </div>
    </div> */}

         </div>
       </div>
    )
}

export default SearchPage