import { PencilIcon } from "@heroicons/react/24/solid";
import { Loader } from "../../../components/Loader";
import useGetHotelDetails from "../hooks/useGetHotelDetails";
import { useGetAHotelForAdminQuery } from "../services/getAHotelApiSlice";
import ImageContainer from "./ImageContainer";
import { Button, Input, useSelect } from "@material-tailwind/react";
import { useState } from "react";
import { InputModal } from "./InputModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHotelName,
  updateHotelName,
} from "../../hotelRegistration/services/EditHotelFormSlice";
import { selectHotelById } from "../services/hotelListSlice";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

const HotelDetailsSection = ({ hotel_id }) => {
  const dispatch = useDispatch();
  const { hotel, isError, isFetching, isLoading, isSuccess } =
    useGetHotelDetails(hotel_id);
  const hotelName = useSelector(selectHotelName);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [InputDetailsToPass, setInputDetails] = useState(null);



  return (
    <>


      <div className="">
        <div className="flex justify-around border-2 ps-28">
        <h2 className="p-5 text-center text-xl  ms-[15%]">Hotel Details</h2>
          <h2 className="p-5 pt-7 text-center text-blue-900 text-[0.8rem]"><Link to={`/owner/review/${hotel_id}`}>View Reviews</Link> </h2>
        </div>
        <TableRow hotel={hotel} isLoading={isLoading} />
      </div>

      <div className="flex flex-col items-center border-2 mt-5">
        <div className="flex">
          <h2 className=" text-xl  w-full text-center py-3">
            Hotel Images
          </h2>
        </div>
        <div className="">
          <ImageContainer images={hotel?.images} hotel_id={hotel_id} />
        </div>
      </div>
    </>
  );
};

export default HotelDetailsSection;
