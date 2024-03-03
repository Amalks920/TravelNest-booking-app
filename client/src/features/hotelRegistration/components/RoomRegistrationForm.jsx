import { useNavigate, useParams } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Textarea, Select, Option, Checkbox, Spinner } from "@material-tailwind/react";
import { Field, Formik } from "formik";
import { useAddRoomMutation } from "../services/roomRegApiSlice";
import * as Yup from "yup";
import { useEffect } from "react";

import editRoomFormSlice, {
  selectRoomType,
  selectAmenities,
  selectBathroomType,
  selectDescription,
  selectNoOfRooms,
  selectSize,
  selectRate,
} from "../services/editRoomFormSlice";
import { useSelector } from "react-redux";
import useGetRoom from "../hooks/useGetRoom";
import { useEditHotelMutation } from "../services/EditHotelApiSlice";
import { useEditRoomMutation } from "../services/editRoomApiSlice";

const RoomRegistrationForm = ({ isEditForm }) => {
  const { hotel_id } = useParams();
  const { _id: room_id } = useParams();

  const initialRoomType = useSelector(selectRoomType)
  const initialAmenities = useSelector(selectAmenities)
  const initialBathroomType = useSelector(selectBathroomType)
  const initialDescription = useSelector(selectDescription)
  const initialNoOfRooms = useSelector(selectNoOfRooms)
  const initialRate = useSelector(selectRate)
  const initialSize = useSelector(selectSize)
  const img = useGetRoom(room_id)

  const navigate = useNavigate();
  const [addRoom, { isError, isLoading, isSuccess }] = useAddRoomMutation();
  const [editRoom, { isError: editIsError, isLoading: editIsLoading }] = useEditRoomMutation()
  console.log(initialNoOfRooms)
  useEffect(() => {

    isSuccess && navigate(`/owner/room-list/${hotel_id}`);
  }, [isSuccess]);

  const _onSave = async (values) => {
    try {
      const {
        roomType,
        noOfRooms,
        amenities,
        noOfPeopleAllowed,
        rate,
        size,
        bathroomType,
        description,
        images,
        tv,
        ac,
        wifi
      } = values;

      let formData = new FormData();

      formData.append("roomType", roomType);
      formData.append("noOfRooms", noOfRooms);
     // formData.append("amenities", amenities);
      formData.append("rate", rate);
      formData.append('noOfPeopleAllowed', noOfPeopleAllowed)
      formData.append("size", size);
      formData.append("bathroomType", bathroomType);
      formData.append("description", description);
      formData.append("hotel_id", hotel_id);

      if(tv[0]==='tv') formData.append('amenities',tv[0])
      if(ac[0]==='ac') formData.append('amenities',ac[0])
      if(wifi[0]==='wifi') formData.append('amenities',wifi[0])


      console.log(formData["hotel_id"]);
      for (var i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      isEditForm && formData.append('room_id', room_id)
      const response = addRoom(formData)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  if (isLoading) return <Spinner className="h-12 w-12" />

  return (
    <Formik
      initialValues={{
        roomType: !isEditForm ? "single" : initialRoomType,
        noOfRooms: !isEditForm ? null : initialNoOfRooms,
       // amenities: !isEditForm ? null : initialAmenities,
        rate: !isEditForm ? null : initialRate,
        size: !isEditForm ? null : initialSize,
        bathroomType: !isEditForm ? "en-suite" : initialBathroomType,
        tv: '',
        wifi: '',
        ac: '',
        //amenities:[],
        description: !isEditForm ? "" : initialDescription,
        noOfPeopleAllowed: 0,
        images: [],
      }}
      validationSchema={Yup.object().shape({
        noOfRooms: Yup.number().required('no of rooms required'),
        rate: Yup.number().required(),
        size: Yup.number().required(),
       // amenities: Yup.string().required(),
        description: Yup.string()
          .min(30, "description should contain atleast 30 characters")
          .max(300, "maximum characters allowed exceeded")
          .required('description required'),
        images: Yup.mixed().required(),
        noOfPeopleAllowed: Yup.number()
          .min(1, 'must be greater than or equal to 1')
          .required('no of people allowed is required')
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
        <form
          onSubmit={handleSubmit}
          className=" grid grid-rows-[80px,80px,80px,80px,80px,80px,80px,80px]  grid-cols-[30%,30%] w-[100%]  min-h-[150vh] place-content-center gap-4"
          action=""
        >
          <div className="col-span-2 row-span-1">
            <h1 className=" top-28 text-2xl text-center">Room Registration</h1>
          </div>
          <div className="md:col-span-1 col-span-2">
            <Field
              className='w-full h-1/2 ps-3 rounded-md bg-white border-2 border-gray-300'
              name="roomType"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.roomType}
              error={
                errors.roomType &&
                touched.roomType &&
                errors.roomType
              }
              success={
                !errors.bathroomType && touched.bathroomType ? true : false
              }
              as="select"
              label="Room Type"
            >
              <option className="font-light" value="single">single</option>
              <option value="double">double</option>
              <option value="suite">suite</option>
              <option value="family">family</option>
              <option value="adjoining">adjoining</option>
              <option value="presidential">presidential</option>
              <option value="penthouse">penthouse</option>
            </Field>
          </div>
          <div className="md:col-span-1 col-span-2">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.noOfRooms}
              error={errors.noOfRooms && touched.noOfRooms && errors.noOfRooms}
              success={!errors.noOfRooms && touched.noOfRooms ? true : false}
              name="noOfRooms"
              type='number'
              label={!errors.noOfRooms ? "No of Rooms" : errors.noOfRooms}
            />
          </div>
          <div className="row-span-1 md:col-span-1 col-span-2">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.amenities}
              error={errors.amenities && touched.amenities && errors.amenities}
              success={!errors.amenities && touched.amenities ? true : false}
              name="amenities"
              label={!errors.amenities ? "Amenities" : errors.amenities}
            />
          </div>
          <div className="md:col-span-1 col-span-2">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rate}
              error={errors.rate && touched.rate && errors.rate}
              success={!errors.rate && touched.rate ? true : false}
              name="rate"
              type='number'
              label={!errors.rate ? "Rate Per Room" : errors?.rate}
            />
          </div>

          <div className="md:col-span-1 col-span-2">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.size}
              error={errors.size && touched.size && errors.size}
              success={!errors.size && touched.size ? true : false}
              name="size"
              type='number'
              label={!errors?.size ? "Size of the room in square units" : errors.size}
            />
          </div>
          <div className="md:col-span-1 col-span-2">
            <Field
              className='w-full h-1/2 ps-3 border-2 bg-white border-gray-300 rounded-md'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bathroomType}
              error={
                errors.bathroomType &&
                touched.bathroomType &&
                errors.bathroomType
              }
              success={
                !errors.bathroomType && touched.bathroomType ? true : false
              }
              as="select"
              name="bathroomType"
              label={!errors.bathroomType ? "Bathroom Type" : errors.bathroomType}
            >
              <option value="en-suite">En-suite</option>
              <option value="bathtub">Bathtub</option>
              <option value="shower">Shower</option>
            </Field>
          </div>
          <div className=" row-span-2 col-span-2 ">
            <Textarea
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={
                errors.description && touched.description && errors.description
              }
              success={
                !errors.description && touched.description ? true : false
              }
              label={!errors?.description ? "Description" : errors.description}
            ></Textarea>
          </div>



          <div className=" row-span-1 col-span-1">
            <FormInput
              onChange={(event) => {
                setFieldValue("images", event.target.files);
              }}
              name="images"
              type={"file"}
              multiple
              accept=".avif,image/* "
              label={!errors.images ? "Images" : errors.images}
            />
          </div>

          <div className=" row-span-1 col-span-1">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.noOfPeopleAllowed}
              error={errors.noOfPeopleAllowed && touched.noOfPeopleAllowed && errors.noOfPeopleAllowed}
              success={!errors.noOfPeopleAllowed && touched.noOfPeopleAllowed ? true : false}
              name="noOfPeopleAllowed"
              type='number'

              label={!errors.noOfPeopleAllowed ? "No of People Allowed" : errors?.noOfPeopleAllowed}
            />
          </div>

          <div className=" flex-wrap row-span-2 col-span-2 overflow-scroll gap-16 p-7 mb-10 flex">
            <h2 className="absolute  text-[0.9rem] ms-4">amenities</h2>
            <div className="mt-4"
            >
              <Checkbox
                onChange={handleChange}
                onBlur={handleBlur}
                name="tv"
                value={'tv'}
                label={'TV'} />
            </div>
            <div className="mt-4">
              <Checkbox
                onChange={handleChange}
                onBlur={handleBlur}
                name="wifi"
                value={'wifi'}
                label={'WIFI'} />
            </div>
            <div className="mt-4">
              <Checkbox
                onChange={handleChange}
                onBlur={handleBlur}
                name="ac"
                value={'ac'}
                label={'AC'} />
            </div>
            {/* <div className="mt-4">
                <Checkbox label={'AC'}/>
              </div>
              <div className="mt-4">
                <Checkbox label={'AC'}/>
              </div> */}
          </div>

          <div className="col-span-2 row-span-1">
            <ButtonDefault
              value={"Submit"}
              bg={"blue"}
              type={"submit"}
              width={"sm"}
            />
          </div>


        </form>
      )}
    </Formik>
    // </>
  );
};

export default RoomRegistrationForm;
