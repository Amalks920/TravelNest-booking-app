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
import { formatDate } from "../../../utils/formatDate";

const Cards = ({ text,rate,roomType,room_id,hotel_id,images }) => {

  console.log(images)
  return (
    <Link to={`/hotel-details/${hotel_id}/${room_id}/${formatDate(new Date())}/${formatDate(new Date())}`} className="col-span-1 row-span-1 bg-cover rounded-sm brightness-95" style={{backgroundImage:`url(${IMAGE_BASE_URL+'/'+images[0]})`}}>


      <div className="w-[400px] h-[200px] flex  p-5 flex-col-reverse">
       
        <h2 className="text-white font-bold">{roomType}</h2>
        <div className="flex justify-between">
          <h2 className="text-white font-semibold">₹ {rate}</h2>
        </div>
      </div>
      {/* <div
        class="relative flex flex-col text-gray-700 bg-white   bg-clip-border  w-[350px]">
        <div class="relative mx-4  overflow-hidden text-gray-700 bg-white bg-clip-border  h-[200px]">
          <img
            src={IMAGE_BASE_URL + '/' + `${images[1]}`}
            alt="card-image" className="object-cover bg-black bg-gradient-to-b w-full h-full brightness-95" />


          <div class="p-6 relative -top-44 ">
            <div class="flex items-center justify-between mb-2">
              <p class="block font-sans  antialiased  leading-relaxed text-white text-sm capitalize">
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


          </div>

        </div>

      </div> */}
    </Link>
  );
}


export default Cards