import { useState } from "react";


const Email=({email,editEmail,setEditEmail, setIsOtpInput, isOtpInput, userEmail, setUserEmail,setOtp,otp})=>{

    return (
        <div className="flex gap-1">
         
        <input
          className="w-[100%] p-[5px] border-2 border-black rounded-md"
          type={!isOtpInput?"text":'number'}
          value={!isOtpInput? userEmail:otp}
          placeholder={isOtpInput?"Enter otp":'email'}
          onChange={(e)=>{
            !isOtpInput?setUserEmail(e.target.value):setOtp(e.target.value)
          }}
        />
        <svg
        onClick={()=>{
          setEditEmail(!editEmail)
        }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-6 h-6 mt-2 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    )
}

export default Email;