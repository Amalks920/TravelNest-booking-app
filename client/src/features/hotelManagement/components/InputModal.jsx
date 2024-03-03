import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";

import { Form, Formik } from "formik";

import * as Yup from "yup";
import { FormInput } from "../../../components/form/FormInput";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import {
  useEditHotelDetailsMutation,
  useEditHotelLocationMutation,
  useEditHotelDescriptionMutation,
} from "../services/editHotelDetailsApiSlice";

export function InputModal({
  inputModalOpen,
  setInputModalOpen,
  InputDetailsToPass,
  _id,
}) {
  // const [value,setValue]=useState(InputDetailsToPass?.value)
  const [editHotelDetails, { isError, isLoading, isSuccess }] =
    useEditHotelDetailsMutation();

  const [
    editHotelLocation,
    {
      isError: isErrorEditLocation,
      isLoading: isLoadingEditLocation,
      isSuccess: isSuccessEditLocation,
    },
  ] = useEditHotelLocationMutation();

  const [
    editHotelDescription,
    {
      isError: isErrorEditDescription,
      isLoading: isLoadingEditDescription,
      isSuccess: isSuccessEditDescription,
    },
  ] = useEditHotelDescriptionMutation();

  const handleOpen = () => setInputModalOpen(!inputModalOpen);
  const { name, value } = InputDetailsToPass;
  console.log(value, name);

  // console.log(name)
  //   const  _onSave=(value)=> {
  //     console.log(value);
  //   }

  const handleUpdate = async (data) => {
    try {
      const response =
        name === "hotelName"
          ? await editHotelDetails(data)
          : name === "location"
          ? await editHotelLocation(data)
          : name === "description"
          ? await editHotelDescription(data)
          : null;
      console.log(response);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={
          name === "hotelName"
            ? { hotelName: value }
            : name === "location"
            ? { location: value }
            : name === "description"
            ? { description: value }
            : null
        }
        validationSchema={Yup.object().shape({
          hotelName: Yup.string()
            .min(8, "hotelname should be 6 chars minimum")
            .required("hotelname is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
          _onSave(values);
        }}
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
          <form onSubmit={handleSubmit} action="">
            <Dialog open={inputModalOpen} size="xs" handler={handleOpen}>
              <div className="flex items-center justify-between">
                {/* <DialogHeader className="flex flex-col items-start">

          </DialogHeader> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 h-5 w-5"
                  onClick={handleOpen}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <DialogBody>
                {/* <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write the message and then click button.
          </Typography> */}
                <div className="grid gap-6">
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    No of rooms needed
                  </Typography>
                  {/* {InputToPass} */}
                  {/* <Textarea label="Message" /> */}

                  {name != "description" ? (
                    <FormInput
                      name={name}
                      onChange={handleChange}
                      value={
                        name === "location"
                          ? values?.location
                          : name === "hotelName"
                          ? values?.hotelName
                          : null
                      }
                      onBlur={handleBlur}
                      error={
                        errors.description &&
                        touched.description &&
                        errors.description
                      }
                      success={!errors.description && touched.description}
                      width={"lg"}
                      // onInput={(e)=>{
                      //     setValue(e.target.value)
                      // }}
                      label={InputDetailsToPass.label}
                    />
                  ) : (
                    <Textarea
                      name={name}
                      onChange={handleChange}
                      value={values.description}
                      onBlur={handleBlur}
                      error={
                        errors.description &&
                        touched.description &&
                        errors.description
                      }
                      success={!errors.description && touched.description}
                      width={"lg"}
                      // onInput={(e)=>{
                      //     setValue(e.target.value)
                      // }}
                      label={InputDetailsToPass.label}
                    >
                      {name}
                    </Textarea>
                  )}
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                {/* <Button variant="text" color="gray" onClick={handleOpen}>
                cancel
              </Button> */}
                <ButtonDefault
                  onClick={() => {
                    const err = errors.description;
                    console.log(err);
                    if (!err) {
                      if (name === "description") {
                        const description = values.description;
                        handleUpdate({ _id, description });
                      } else if (name === "hotelName") {
                        const hotelName = values.hotelName;
                        handleUpdate({ _id, hotelName });
                      } else if (name === "location") {
                        const location = values.location;
                        handleUpdate({ _id, location });
                      }
                    }
                  }}
                  type="submit"
                  value={"submit"}
                  variant="gradient"
                  color="gray"
                >
                  send message
                </ButtonDefault>
              </DialogFooter>
            </Dialog>
          </form>
        )}
      </Formik>
    </>
  );
}
