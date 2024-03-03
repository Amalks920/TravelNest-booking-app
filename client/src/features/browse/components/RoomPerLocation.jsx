import { useState } from "react";
import { IMAGE_BASE_URL } from "../../../data/constants";



const RoomPerLocation = ({ location }) => {

    const [hotelLocation, setLocation] = useState(location[0]?._id)
    console.log(hotelLocation)

    return (
        <>
            <div className="border-b-2 h-[60px] flex gap-4 justify-left items-center px-[50px]">

                {/* <h2 className="font-bold text-[1.3rem] text-center w-full my-3">Popular Locations</h2> */}
                {location?.map(({ _id, hotelImages }, index) => {
                    return <h2
                        onClick={() => {
                            console.log(_id)
                            setLocation(_id)
                        }}
                        className={`capitalize cursor-pointer  text-[1.1rem] ${hotelLocation === _id ? 'border-b-4 border-black font-bold' : null}
    text-center   w-full h-[100%] pt-4`}>{_id}</h2>;
                })}
            </div>

            <div className="flex gap-4 justify-left items-center px-[50px] mb-4">
                {location?.map(({ _id, hotelImages }, index) => {

                    return <div className=" text-center  w-full h-[100%] pt-4 cursor-pointer" >
                        <div className="w-[80%] h-[160px] bg-cover rounded-md" style={{ backgroundImage: `url(${IMAGE_BASE_URL + '/' + hotelImages[0][0]})` }}></div>
                    </div>

                })}
            </div>
        </>
    )
}

export default RoomPerLocation;