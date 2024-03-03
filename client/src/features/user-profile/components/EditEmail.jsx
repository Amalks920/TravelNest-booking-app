import { PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useChangeEmailMutation,  useVerifyEmailSignupMutation, useVerifyOtpMutation } from "../services/getUserInfoApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";

const EditEmail = ({ editEmail, setEditEmail, userEmail,setIsOtpInput ,otp,isOtpInput}) => {
    const user_id=useSelector(selectUserId)
  const [verifyEmailSignup, { isError, isLoading, isSuccess }] =
    useVerifyEmailSignupMutation();

  const [verifyOtp]=useVerifyOtpMutation()

  const [changeEmail]=useChangeEmailMutation()

  return (
    <div>
      {!editEmail ? (
        <PencilIcon
          onClick={() => {
            setEditEmail(!editEmail);
          }}
          width={17}
          className=" cursor-pointer me-6 ms-5"
        />
      ) : (
        <div className="col-span-1 row-span-1 flex justify-between gap-1">
          <Button
            onClick={async ()=>{
             const response=  !isOtpInput? await verifyEmailSignup({email:userEmail}):await verifyOtp({otp:otp,email:userEmail})
               !isOtpInput && setIsOtpInput(true)
            if(response?.data===true){
                await changeEmail({email:userEmail,user_id:user_id})
            }

            }}
          size="sm">submit</Button>
        </div>
      )}
    </div>
  );
};

export default EditEmail;
