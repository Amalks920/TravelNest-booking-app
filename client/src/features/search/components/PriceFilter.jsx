import { Checkbox, Radio } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAminities,
  selectCheckIn,
  selectCheckOut,
  selectLocation,
  selectPriceRange,
  selectRoomType,
  updatePriceRange,
  updateSearchResult,
} from "../../../services/searchSlice";
import useGetSearchHotels from "../hooks/useGetSearchHotels";
import { useSearchMutation } from "../../browse/services/searchApiSlice";
import AmenitiesFilter from "./AmenitiesFilter";

const PriceFilter = () => {
  // const [priceRange, setPriceRange] = useState(null);
  const dispatch = useDispatch();
  const searchString = useSelector(selectLocation);
  const checkIn = useSelector(selectCheckIn);
  const checkOut = useSelector(selectCheckOut);
  const roomType = useSelector(selectRoomType);
  const priceRange = useSelector(selectPriceRange);
  const aminities =useSelector(selectAminities)
  //hook to rerender hotel section in search page
  // useGetSearchHotels()
  const [search, { isError, isLoading, isSuccess, reset }] =
    useSearchMutation();

  const handleSearch = async () => {
    try {
      const response = await search({
        location: searchString,
        checkIn: checkIn,
        checkOut: checkOut,
        roomType: roomType,
        priceRange: priceRange,
        aminities:aminities
      });
      console.log(response);
      dispatch(updateSearchResult(response.data.response));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(aminities)
    handleSearch();
  }, [priceRange,aminities]);
  return (
    <>
      <h2 className="w-full text-left mt-8 ms-8 font-bold">Price</h2>
      <div className="  w-full">
        <div className="flex  justify-left gap-5  ">
          <div className="flex justify-end">
            <Radio
              className="w-4 h-4"
              onInput={() => {
                dispatch(updatePriceRange({ min: 500, max: 1999 }));
                // handleSearch()
              }}
              name="price-range"
              size={"sm"}
            />
          </div>
          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem] md:text-[0.7rem]">
            <span>₹500</span> - <span>₹1999</span>
          </h2>
        </div>
        <div className="flex  justify-left gap-5   ">
          <div>
            <Radio
              className="w-4 h-4"
              onInput={() => {
                dispatch(updatePriceRange({ min: 2000, max: 3499 }));
              }}

              name="price-range"
              value={{ min: 3000, max: 1499 }}
              size={"sm"}
            />
          </div>
          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem] md:text-[0.7rem]">
            <span>₹2000</span> - <span>₹3499</span>
          </h2>
        </div>

        <div className="flex  justify-left gap-5 ">
          <div>
            <Radio
              className="w-4 h-4"
              onInput={() => {
                dispatch(updatePriceRange({ min: 3500, max: 4999 }));
                // handleSearch()
              }}
              name="price-range"
              size={"sm"}
            />
          </div>
          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem]  md:text-[0.7rem]">
            <span>₹3500</span> - <span>₹4999</span>
          </h2>
        </div>

        <div className="flex  justify-left gap-5 ">
          <div>
            <Radio
              className="w-4 h-4"
              onInput={() => {
                dispatch(updatePriceRange({ min: 5000, max: 6499 }));
                // handleSearch()
              }}
              name="price-range"
              size={"sm"}
            />
          </div>
          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem]  md:text-[0.7rem]">
            <span>₹5000</span> - <span>₹6499</span>
          </h2>
        </div>

        <div className="flex  justify-left gap-5 ">
          <div>
            <Radio
              className="w-4 h-4"
              onInput={() => {
                dispatch(updatePriceRange({ min: 6500, max: 7499 }));
                // handleSearch()
              }}
              name="price-range"
              size={"sm"}
            />
          </div>
          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem]  md:text-[0.7rem]">
            <span>₹6500</span> - <span>₹7499</span>
          </h2>
        </div>

        <div className="flex  justify-left gap-5 ">
          <div>
            <Radio
              className="w-4 h-4"
              onInput={() => {
                dispatch(updatePriceRange({ min: 7500, max: 8499 }));
                // handleSearch()
              }}
              name="price-range"
              size={"sm"}
            />
          </div>
          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem] md:text-[0.7rem]">
            <span>₹7500</span> - <span>₹8499</span>
          </h2>
        </div>

        <div className="flex  justify-left gap-5 ">
          <div>
            <Radio
              className="w-4 h-4"
              onInput={() => {
                dispatch(updatePriceRange({ min: 8500, max: 9499 }));
                // handleSearch()
              }}
              name="price-range"
              size={"sm"}
            />
          </div>
          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem] md:text-[0.7rem] ">
            <span> ₹ 8500 </span> - <span> ₹ 9499</span>
          </h2>
        </div>
      </div>

      <h2 className="w-full text-left mt-8 mb-5 ms-[11%] font-bold hidden">Amenities</h2>
              <AmenitiesFilter />
    </>
  );
};

export default PriceFilter;
