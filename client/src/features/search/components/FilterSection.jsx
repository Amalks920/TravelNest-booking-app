import { Checkbox, Radio, Slider } from "@material-tailwind/react";
import PriceFilter from "./PriceFilter";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPriceRange } from "../../../services/searchSlice";

const FilterSection = () => {



  return (
    <div className=" h-full p-5 overflow-scroll border-r-2 " style={{scrollbarWidth:'none'
    }}>
      <div className="flex flex-col justify-center items-center  rounded-xl">
        <header className="w-full  flex">
          <h2 className=" w-full text-[0.9rem]">Filters</h2>
          <h2 className="text-red-700 font-bold text-[0.7rem] text-right w-full pt-[5px] pe-1 cursor-pointer hidden">
            Clear All
          </h2>
        </header>
        <PriceFilter/>
      </div>
    </div>
  );
};

export default FilterSection;
