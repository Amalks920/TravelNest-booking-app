import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
  Textarea,
  Input,
} from "@material-tailwind/react";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { usePostReviewDetailsMutation } from "../services/postReviewDetailsApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";

function ReviewModal({ openReviewModal: open, setOpenReviewModal: setOpen,booking_id,hotel_id,room_id }) {
  const [rating, setRating] = useState(0);
  const [review,setReview]=useState('')
  const [reviewDetails,setReviewDetails]=useState([])
  const user_id=useSelector(selectUserId)
  const handleOpen = () => setOpen((cur) => !cur);

  const [postReviewDetails,{isError,isLoading,isSuccess,isUninitialized}]=usePostReviewDetailsMutation();

  const _onSave = async (values) => {
     console.log(reviewDetails)

     const formData=new FormData();
    formData.append('rating',rating);
    formData.append('description',review);
    formData.append('booking_id',booking_id);
    formData.append('user_id',user_id);
    formData.append('hotel_id',hotel_id);
    formData.append('room_id',room_id);
    
    for (let i = 0; i < reviewDetails.length; i++) {
      const file = reviewDetails[i];
      formData.append('images', file);
    }

    await postReviewDetails(formData);


    if(isSuccess) handleOpen()
  };

  return (
    <>
      <Formik
        initialValues={{
          review: "",
          images: [],
        }}

        // validationSchema={Yup.object().shape({
        //   review: Yup.string()
        //     .min(30, " atleast 30 characters")
        //     .max(1000, "maximum 1000 characters")
        //     .required(),
        //     images: Yup.mixed(),
        // })}

        onSubmit={(values) => _onSave(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (

            <form
            onSubmit={()=>console.log('dslkjflsdjfkldskldfs')}
            >
          <Dialog size="xs" open={open} handler={handleOpen}>
            <DialogHeader className="justify-between">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Write a Review
                </Typography>
                <Typography color="gray" variant="paragraph">
                  write a review about us
                </Typography>
              </div>
              <IconButton
                color="blue-gray"
                size="sm"
                variant="text"
                onClick={handleOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </DialogHeader>
            <DialogBody className="overflow-y-scroll !px-5">
              <div className="mb-6">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="py-3 font-semibold uppercase opacity-70"
                >
                  Review
                </Typography>

                <div className="flex flex-col gap-10">
                  <Textarea
                  onChange={(e)=>{
                    setReview(e.target.value)
                  }}
                   // onChange={handleChange}
                    onBlur={handleBlur}
                    value={review}
                    error={errors.review && touched.review && errors.review}
                    success={!errors.review && touched.review ? true : false}
                    label={!errors.review ? "review" : errors.review}
                    name="review"
                  ></Textarea>

                  {/* <Input
                    onChange={(event) => {
                      setFieldValue("images", event.target.files);
                    }}
                    onBlur={handleBlur}
                   // value={values.images}
                    error={errors.images && touched.images && errors.images}
                    success={!errors.images && touched.images ? true : false}
                    label={errors.images ? "images" : errors.images}
                    type="file"
                    name="images"
                    multiple
                    accept=".jpg, .jpeg, .png,.avif, image/*"
                  /> */}
                    <FormInput
              onChange={(event) => {
               // const formData = new FormData();
                const selectedFiles = event.target.files;
                const allImages = [];
                
                for (let i = 0; i < selectedFiles.length; i++) {
                  
                    const file = selectedFiles[i];
                    console.log(file)
                    allImages.push(file);
                 //   formData.append('images', file);
                  //  setReviewDetails(formData)
                }
                setReviewDetails(allImages)
              }}
             // value={images}
              name="images"
              type={"file"}

              multiple
              accept=".avif,image/* "
              label={!errors.images?"Images":errors.images}
            />
                </div>

              </div>
              <div>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="py-4 font-semibold uppercase opacity-70"
                >
                  star rating
                </Typography>
                <div className="flex flex-grow justify-around p-5">
                  <div>
                    <svg
                      onClick={() => {
                        rating < 1 ? setRating(1) : setRating(0);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={rating > 0 ? "yellow" : "black"}
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={rating > 0 ? "yellow" : "black"}
                      class="w-10 h-10 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      onClick={() => {
                        rating < 2 ? setRating(2) : setRating(1);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={rating > 1 ? "yellow" : "black"}
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={rating > 1 ? "yellow" : "black"}
                      className="w-10 h-10 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      onClick={() => {
                        rating < 3 ? setRating(3) : setRating(2);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={rating > 2 ? "yellow" : "black"}
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={rating > 2 ? "yellow" : "black"}
                      class="w-10 h-10"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      onClick={() => {
                        rating < 4 ? setRating(4) : setRating(3);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={rating > 3 ? "yellow" : "black"}
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={rating > 3 ? "yellow" : "black"}
                      className="w-10 h-10"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      onClick={() => {
                        rating < 5 ? setRating(5) : setRating(4);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={rating > 4 ? "yellow" : "black"}
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={rating > 4 ? "yellow" : "black"}
                      className="w-10 h-10"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter className="justify-between gap-2">
              <Typography variant="small" color="gray" className="font-normal">
            
              </Typography>
              <ButtonDefault
                onClick={()=>{
                  _onSave()
                }}
                type={"submit"}
                value={"submit"}
                variant="outlined"
                size="sm"
              >
                Submit
              </ButtonDefault>
            </DialogFooter>
          </Dialog>
          </form>
        )}
      </Formik>
    </>
  );
}

export default ReviewModal;
