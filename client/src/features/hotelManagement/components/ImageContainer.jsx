import { Button, Input } from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import Images from "./Images";

const ImageContainer = ({ images,hotel_id }) => {
  console.log(images);
  return (
    <div className="border-2  max-h-[300px] overflow-scroll p-[5%]">
      <div className="min-h-[200px] ms-28 md:ms-0  flex  flex-wrap gap-3 justify-left w-full">
        {images?.map((image, index) => {
          return (
            <Images image={image} index={index} hotel_id={hotel_id}/>
          );
        })}



      </div>
    </div>
  );
};

export default ImageContainer;
