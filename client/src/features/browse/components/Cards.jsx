import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Chip,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
import ToggleIcon from "../../../components/ToggleIcon";
import ToggleIconLeft from "../../../components/ToggleIconLeft";
import { IMAGE_BASE_URL } from "../../../data/constants";

const Cards=({text,images})=>{

  console.log(images)
            return (
         <Link to={`/hotels-by-location/${text}`}>    


<div
 class="relative flex flex-col text-gray-700 bg-white   bg-clip-border rounded-xl w-96  shadow-md">
  <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
  {/* <div className="overlay"></div> */}
    <img
     src={IMAGE_BASE_URL+'/'+`${images[1]}`}
     // src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
      alt="card-image" className="object-cover bg-black bg-gradient-to-b w-full h-full brightness-95" />


<div class="p-6 relative -top-44 ">
    <div class="flex items-center justify-between mb-2">
      <p class="block font-sans text-base antialiased font-bold leading-relaxed text-white text-[1.4rem] uppercase">
        {text}
      </p>
      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-white">
      
      </p>
    </div>
    <p class="block font-sans text-sm antialiased font-normal leading-normal text-white opacity-75">
   
    </p>
  </div>
  </div>
  <div class="p-3 ">
    <div class="flex items-center justify-between ">

      {/* <p class="block font-sans text-base antialiased font-medium leading-relaxed text-white">
        {hotelName}
      </p>
      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-white">
        {price}
      </p> */}
    </div>
    {/* <p class="block font-sans text-sm antialiased font-normal leading-normal text-white opacity-75">
      {description.slice(0,200)}
    </p> */}
  </div>
  {/* <div class="p-6 pt-0">
    <button
      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
      type="button">
      View More
    </button>
  </div> */}
</div>
     </Link>  
            );
}


export default Cards