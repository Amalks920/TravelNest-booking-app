import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { useGetHotelsByLocationHomeMutation } from "../services/getAllHotelsApiSlice";
import { Spinner } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { updateCheckIn, updateSearchResult } from "../../../services/searchSlice";
import { updateCheckOut } from "../services/priceSlice";
import { useDispatch } from "react-redux";
import { useSearchMutation } from "../services/searchApiSlice";


const LocationWiseHotels = ({ location, isLoading: isLoadingLocation }) => {

    const [hotelLocation, setLocation] = useState('mumbai')
    const [hotelArrayByLocation, setHotelArrayByLocation] = useState([])
    const [hotelName,setHotelName]=useState('')

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [search] =
    useSearchMutation();



    const [getHotelsByLocationHome, { isError, isLoading, isSuccess }] = useGetHotelsByLocationHomeMutation()

   const [getHotelRoomByLocation] = useGetHotelsByLocationHomeMutation()


    const handleGetHotelByLocationHome = async (hotelLocation) => {
        const response = await getHotelsByLocationHome({ location: hotelLocation })
        console.log(response)
        setHotelArrayByLocation(response.data.response)
    }

  
    

    useEffect(() => {
        handleGetHotelByLocationHome(hotelLocation)
    }, [])

    if (isLoadingLocation) return <Spinner />
    return (
        <div className="w-[99%] sm:h-[250px] h-[80px] -ms-[4%] sm:-mt-0 sm:mb-[5%]  shadow-md border-2 bg-white">

            <div className="border-b-2 sm:h-[50px] h-[20px]  gap-1 justify-left items-center flex">
                {location?.map(({ _id }, index) => {

                    return <h2
                        key={index}
                        onClick={() => {
                            setLocation(_id)
                            handleGetHotelByLocationHome(_id)
                        }}
                        className={`capitalize cursor-pointer sm:pt-2   sm:text-[1.1rem] text-[9px] sm:mt-0 mt-[1%] mx-[12%] ${hotelLocation === _id ? 'border-b-2 border-black font-bold' : null}
              text-center   w-full h-[100%] sm:pt-0 text-[15px] font-serif`}>{_id}</h2>;
                })}
            </div>

            <div className="flex  justify-left sm:gap-10 gap-4 ms-[2%] items-center mb-4">
                {hotelArrayByLocation?.map(({ _id, hotelName, images }, index) => {

                    return <Link

                        to={`/hotels-by-location/${hotelName}`}
                        key={index} className="text-center h-[100%] mt-[1.5%]  cursor-pointer  flex justify-left" >
                        <div
                            onClick={() => {
                                setHotelName(hotelName) 
                              dispatch(updateCheckIn(formatDate(new Date()))) 
                              dispatch(updateCheckOut(formatDate(new Date())))
                              
                            //  handleSearch(hotelName)
                            }}
                            className="sm:w-[250px] w-[80px] h-[40px] sm:h-[130px] bg-cover bg-no-repeat  text-white brightness-90 flex 
            justify-left items-end sm:text-[0.8rem] text-[0.2rem] text-left ps-3 pb-3 pe-3 font-bold sm:mt-4 mt-1"
                            style={{ backgroundImage: `url(${IMAGE_BASE_URL + '/' + images[0]})` }}>
                            {hotelName}
                        </div>
                    </Link>

                })}
            </div>

        </div>
    )
}

export default LocationWiseHotels;