import { Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSearchBarOpen, updateIsSearchBarOpen } from "../services/searchSlice";


const Search = () => {
    const isSearchBarOpen=useSelector(selectIsSearchBarOpen)
    const dispatch=useDispatch()
    

  return (
    <div className="hidden  md:grid grid-flow-row grid-cols-[40%,30%,30%] min-w-[300px]  border-2 rounded-full -mt-2">
      
     <div className=" col-span-1 text-center flex justify-center items-center border-r-2 text-[0.8rem] font-bold">Location</div>
     <div className=" col-span-1 text-center flex justify-center items-center border-r-2 text-[0.8rem] font-bold">Room type</div>
     <div className="col-span-1 text-center  ms-8">
        <Button
        onClick={()=>{
            dispatch(updateIsSearchBarOpen(!isSearchBarOpen))
        }}
    
        size="sm"
        className="rounded-full w-[40px] h-[40px] m-1 text-center bg-gray-700 "
      >
                <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5 relative right-1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Button>
     </div>

    </div>
    // <div className="flex justify-between w-[22vw] gap-2  rounded-full items-center border-2 ">
    //   {/* <Input label="search" className="rounded-full h-[30px] w-12"/> */}
    // <div  className=" w-full h-full text-center"></div>
    // <div className=" w-full h-full text-center"></div>
    // <div className=" w-full h-[100%] text-center"></div>
    // <div className="flex justify-center h-fit  gap-2 m-1 ">
    
    //   <Button
    //     onClick={()=>{
    //         dispatch(updateIsSearchBarOpen(!isSearchBarOpen))
    //     }}
    //     color="red"
    //     size="sm"
    //     className="rounded-full w-[50px] h-[50px] text-center"
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke-width="2"
    //       stroke="currentColor"
    //       className="w-6 h-6   "
    //     >
    //       <path
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //         d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    //       />
    //     </svg>
    //   </Button>

    //   </div>
    // </div>
  );
};

export default Search;
