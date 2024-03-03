import { Rating } from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../../data/constants";

const ReviewSection = ({ reviews }) => {
    console.log(reviews)



  return (
    reviews.map(({userName,created_time,description,images,rating},index)=>{
      return  <>
  
      <div className="p-5 flex justify-between border-2 mt-4">
        <h2 className="text-[1.2rem]">{userName}</h2>
        <div><Rating value={rating} readonly/></div>
      
      </div>
      
      <div className="p-5  flex flex-col justify-between border-2 border-t-0" >
        <div className="flex gap-5 mb-5">
          {
            images.map((image,index)=>{
              return <img src={`${IMAGE_BASE_URL + image}`} className="rounded-md" alt="" width={150} />
            })
          }
         
        </div>
      <h2>{description}</h2>
      <div className=" flex justify-end"><h2 className="text-[0.8rem]">{created_time}</h2></div>
     
      </div>
      
    </>
    })

  );
};

export default ReviewSection;
