import { Formik } from "formik";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Button, Textarea } from "@material-tailwind/react";
import { Form, Field } from "formik";
import * as Yup from "yup";
import KErrorMessage from "../../../components/form/ErrorMessage";
import useEventCallback from "use-event-callback";
import { useEffect, useRef, useState } from "react";
import { useRegisterHotelMutation } from "../services/hotelRegApiSlice";
import axios from "axios";
import { BASE_URL, IMAGE_BASE_URL } from "../../../data/constants";
import { useSelector } from "react-redux";
import {
  selectToken,
  selectUserId,
} from "../../authentication/services/loginSlice";

// import {
//   selectHotelName,
//   selectDescription,
//   selectImages,
//   selectLocation,
//   updateDescription,
//   updateHotelName,
//   updateImage,
//   updateLocation,
// } from "../services/editHotelFormSlice";
import useGetHotel from "../hooks/useGetHotel";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEditHotelMutation } from "../services/EditHotelApiSlice";
import { NotificationDialog } from "../../../components/modals/NotificationModal";
import { useRemoveHotelImageMutation } from "../services/RemoveImageApiSlice";

const RegistrationForm = ({ isEditForm }) => {
  const { hotel_id } = useParams();
  const token = useSelector(selectToken);
  const user_id = useSelector(selectUserId);
  const imageToBeRemoved=useRef(null)

  // const initialHotelName = useSelector(selectHotelName);
  // const initialLocation = useSelector(selectLocation);
  // const initialDescription = useSelector(selectDescription);
  // const initialImages = useSelector(selectImages);
  // const hotelImages = useGetHotel(hotel_id);
  const navigate = useNavigate();
  const [isModalOpen,setIsModalOpen]=useState(false)

  const [registerOrEditHotel, { isError, isLoading, isSuccess }] = !isEditForm
    ? useRegisterHotelMutation()
    : useEditHotelMutation();


    const [removeHotelImage,{isError:removeImgIsError,isLoading:removeImgIsLoading,isSuccess:removeImgIsSuccess,reset:removeImgReset}]=useRemoveHotelImageMutation()

  const _onSave = async (values) => {
    try {
      const { hotelName, location, description, images } = values;

      const formData = new FormData();
      console.log(user_id, "user_Idiii");
      formData.append("hotelName", hotelName);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("owner_id", user_id);

      for (var i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      isEditForm && formData.set("hotel_id", hotel_id);

      const response = await registerOrEditHotel(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const removeHandler= (hotel_id)=>{
  //   let img_public_id
  //   console.log(imageToBeRemoved)
  //   console.log(hotel_id)
  //       removeHotelImage(hotel_id,img_public_id=imageToBeRemoved.current)
  // } 

  useEffect(() => {
    console.log(isSuccess);
    isSuccess && navigate("/owner/hotel-list");
  }, [isSuccess]);

  
  if(isLoading) return <h1>Loading...</h1>

  return (
    <Formik
      initialValues={{
        hotelName: "",
        location: "",
        description: "",
        images: "",
      }}
      validationSchema={Yup.object().shape({
        hotelName: Yup.string()
          .min(8, "hotelname should be 6 chars minimum")
          .required("hotelname is required"),
        location: Yup.string().min(4, "location is required").required(),
        description: Yup.string()
          .min(30, " atleast 30 characters")
          .max(1000, "maximum 1000 characters")
          .required(),
        images: Yup.mixed(),
      })}
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
        <>
        {
          isEditForm &&
          <NotificationDialog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          heading={'Do you want to delete this Image?'}
          description={'image will be deleted from hotel'}
          buttonText={'Delete'}
          args={{hotel_id,imageToBeRemoved:imageToBeRemoved.current}}
          // isBlocked={!isBlockedRef.current}
          // user_id={userIdRef.current}
           sendRequestHandler={removeHotelImage}
           error = {removeImgIsError}
           loading = {removeImgIsLoading}
           success = {removeImgIsSuccess}
           reset={removeImgReset}
        />
        }
        <Form
          onSubmit={handleSubmit}
          className={`grid grid-rows-[80px,80px,80px,80px,80px,80px,80px,80px,${
            isEditForm && "80px"
          }] sm:grid-cols-[25%,20%] grid-cols-[40%,40%] gap-4  place-content-center border-2   w-full min-h-[100vh]`}
          action=""
        >
          <div className="row-span-1 col-span-2">
            <h1 className="text-center text-2xl">
              {!isEditForm ? "Hotel Registration" : "Edit Hotel Details"}
            </h1>
          </div>

          <div className=" row-span-2 col-span-2 xl:col-span-1">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hotelName}
              error={errors.hotelName && touched.hotelName && errors.hotelName}
              success={!errors.hotelName && touched.hotelName ? true : false}
              type={"text-area"}
              name="hotelName"
              label={!errors.hotelName ? "Hotel Name" : errors.hotelName}
            />
            {/* <KErrorMessage name={'hotelName'}/> */}
          </div>

          <div className="xl:col-span-1 col-span-2 border">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
              error={errors.location && touched.location && errors.location}
              success={!errors.location && touched.location ? true : false}
              width={"lg"}
              name="location"
              label={!errors.location ? "Location" : errors.location}
            />
          </div>
          <div className="row-span-3 col-span-2">
            <Textarea
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={
                errors.description && touched.description && errors.description
              }
              success={
                !errors.description && touched.description ? true : false
              }
              label={!errors.description ? "description" : errors.description}
              name="description"
            ></Textarea>
            {/* <FormInput /> */}
          </div>
          {isEditForm === true && hotelImages?.length!=0 && (
            <div className="row-span-2 col-span-2 my-14 shadow-sm p-5">
              <div className="flex flex-wrap justify-center items-center">
                {hotelImages.map((img) => {
                  return (
                    // <div className="border-2 border-black h-[60px] w-[50%]">

                    <div className="ml-7 max-w-[150px] m-1">
                    
                   <svg onClick={()=>{
                    console.log(img)
                    imageToBeRemoved.current=img
                    setIsModalOpen(true)
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6 relative left-28 top-8 cursor-pointer">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
</svg>

                      <img
                        className=""
                        key={img}
                        src={IMAGE_BASE_URL + img}
                      />
                 </div>
                    // {/* </div> */}
                  );
                })}
              </div>
            </div>
          )}
          <div className="row-span-1 col-span-2 ">
            <FormInput
              onChange={(event) => {
                setFieldValue("images", event.target.files);
              }}
              onBlur={handleBlur}
              // value={values.images}
              error={errors.images && touched.images && errors.images}
              success={!errors.images && touched.images ? true : false}
              type={"file"}
              multiple
              accept=".jpg, .jpeg, .png,.avif, image/*"
              label={errors.images ? "images" : errors.images}
              name="images"
            />
          </div>
          <div className="row-span-1 col-span-2 justify-center ">
            <ButtonDefault
              className=""
              loading={isLoading}
              bg={"blue"}
              type={"submit"}
              value={"submit"}
              fullwidth
            />
          </div>
        </Form>
        </>
      )}
    </Formik>
  );
};

export default RegistrationForm;
