import { Spinner } from "@material-tailwind/react";
import { useGetAHotelForUserQuery } from "../../browse/services/getAHotelForUserApiSlice";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { useSelector } from "react-redux";
import { selectPrice } from "../../browse/services/priceSlice";


const PaymentDetails=({hotel_id,checkInDate,checkOutDate,totalNoRooms,roomDetails})=>{

    const {data:hotel,isError,isFetching,isLoading,isSuccess,isUninitialized}=useGetAHotelForUserQuery({hotel_id,room_id:roomDetails[0].id})


    if(isLoading)  return <Spinner/>
    return (
        <div className="my-8 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b-2 pb-5 px-7 m-3">
            <h2 className=" text-[1rem] font-bold">{hotel?.response[0]?.hotelName}</h2>  
            <img className="rounded-md" src={`${IMAGE_BASE_URL+hotel?.response[0]?.images[2]}`} alt="" width={250}/>
            </div>

            <div className="flex justify-between items-center border-b-2 pb-5 px-7 m-3">

                <div className="flex flex-col gap-3">
                    <h2 className=" font-bold text-[1rem]">Check In</h2>
                    <h2 className="text-[0.8rem]">{checkInDate}</h2>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="font-bold text-[1rem]">Check out</h2>
                    <h2 className="text-[0.8rem]">{checkOutDate}</h2>
                </div>
                <div className="flex flex-col justify-center">
                    <h2>{totalNoRooms} Rooms | </h2>
                </div>
              
            </div>

            <div className="flex flex-col justify-center ps-10">
                <div className="flex mb-6">
                <h2 className="capitalize font-bold w-1/3 ">{'room Category'}</h2>
                            <h2 className="capitalize  font-bold  w-1/3 ">{'price'}</h2>
                            <h2  className="capitalize  font-bold  w-1/3 ">{'noOfRooms'}</h2>   
                </div>
                {
                    roomDetails.map(({roomType,price,noOfRooms},index)=>{
                        return( 
                        <div className="flex justify-left ">
                            <h2 className="uppercase w-1/3  ">{roomType}</h2>
                            <h2 className="w-1/3 ">{price}</h2>
                            <h2 className="w-1/3 ">{noOfRooms} </h2>
                            </div>
                        )
                    })
                }
            </div>
        
        </div>
        
    )
}

export default PaymentDetails;