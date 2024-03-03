import { useParams } from "react-router-dom";
import { useGetReviewsOfHotelQuery } from "../services/getReviewsOfAHotel";
import { Spinner } from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../../data/constants";

const HotelReviews = () => {
  const { hotel_id } = useParams();

  const {
    data: reviews,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
  } = useGetReviewsOfHotelQuery({ hotel_id });

  console.log(reviews?.response);

  if (!reviews?.response) return <Spinner />;
  return (
    <div className="flex flex-col border-2 flex-grow mx-[200px] gap-4">
        <h2 className="font-bold ms-6">Reviews</h2>
      {reviews.response.map(({userName,images,description,created_time}, index) => {
        return <div className="p-6 flex flex-col gap-5">
                <div className="flex justify-between">
                <h2 className="text-[1.1rem] font-bold">{userName}</h2>
                <h2 className="text-[0.6rem]">{created_time}</h2>
                </div>
             
               <div className="flex gap-5">
                {
                    images.map((image,index)=>{
                        return <img className="rounded-md" src={IMAGE_BASE_URL+image} alt="" width={130}/>
                    })
                }
               </div>

               <div className="text-[0.8rem]">{description}</div>
        </div>;
      })}
    </div>
  );
};

export default HotelReviews;
