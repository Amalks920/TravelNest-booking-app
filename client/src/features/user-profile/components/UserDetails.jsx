import { useSelector } from "react-redux";
import useGetProfileDetails from "../hooks/useGetProfileDetails";
import { selectUserId } from "../../authentication/services/loginSlice";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEditUserNameMutation } from "../services/getUserInfoApiSlice";
import Email from "./Email";
import EditEmail from "./EditEmail";

const UserDetails = () => {
  const user_id = useSelector(selectUserId);
  const [isWalletHistoryHidden, setIsWalletHistoryHidden] = useState(true);

  const [editEmail, setEditEmail] = useState(false);
  const [editUserName, setEditUserName] = useState(false);

  const [isOtpInput,setIsOtpInput]=useState(false);


  const {
    userInfo,
    isUserInfoError,
    isUserInfoSuccess,
    isUserInfoLoading,
    isUserInfoUnInitialized,

    walletInfo,
    isWalletError,
    isWalletLoading,
    isWalletFetching,
    isWalletUninitialized,
  } = useGetProfileDetails(user_id);

  const [userEmail,setUserEmail]=useState(userInfo?.email)
  const [otp,setOtp]=useState(null);

  const [userName,setUserName]=useState(userInfo?.username)

  const [userNameError,setUserNameError]=useState(false)
  
  const [changeUserName,{isError:isErrorUserName,isLoading:isLoadingUserName,isSuccess:isSuccessUserName}]=useEditUserNameMutation()

  return (
    <div className=" min-h-[100vh]  flex flex-col items-center justify-start pt-[100px] flex-grow">
      <div className=" md:w-[50%] w-[90%]  h-[400px] flex flex-col">
        <div className="flex  w-full h-1/4 bg-gray-900 rounded-md ">
          <div className="w-1/3 h-[100px]"></div>

          <div className=" flex-grow">
            <div className="flex justify-left items-center h-full">
              <h2 className="text-white text-[1.6rem] capitalize font-bold">
                Hi,{userInfo?.username}
              </h2>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="flex  w-full flex-grow ">
          <div className="w-full border-2 ps-[7%] shadow-2xl  grid grid-rows-[70px,70px,70px,70px,100px] grid-cols-3  pt-14">
            <h2 className="text-[1.4rem] mb-7 row-span-1 col-span-full">
              Account Details
            </h2>
            <div className="col-span-1 row-span-1">
              <h2>Email</h2>
            </div>
            {!editEmail ? (
              <div className="col-span-1 row-span-1">
                <h2>{userInfo?.email}</h2>
              </div>
            ) : (
              <div className="col-span-1 row-span-1">
                <Email email={userInfo?.email} editEmail={editEmail} setEditEmail={setEditEmail} 
                 setIsOtpInput={setIsOtpInput} isOtpInput={isOtpInput} userEmail={userEmail} setUserEmail={setUserEmail}
                 setOtp={setOtp} otp={otp}
                 />
              </div>
            )}
            <div className="col-span-1 row-span-1 flex items-start justify-center">
              <EditEmail editEmail={editEmail} setEditEmail={setEditEmail} 
              userEmail={userEmail} setIsOtpInput={setIsOtpInput} otp={otp}
              isOtpInput={isOtpInput}
              />
            </div>

            <div className="col-span-1 row-span-1">
              <h2>Phone</h2>
            </div>
            <div className="col-span-1 row-span-1">
              <h2>{userInfo?.phone}</h2>
            </div>
            <div className="col-span-1 row-span-1 flex items-start justify-center">
              {" "}
              <PencilIcon width={17} className=" cursor-pointer me-6 ms-5" />
            </div>

            <div className="col-span-1 row-span-1">
              <h2>Username</h2>
            </div>
            <div className="col-span-1 row-span-1">
              {
               !editUserName? <h2>{userInfo?.username}</h2>
               :
               <div className="flex">
               <input
               className={`w-[100%] p-[5px] border-2 ${!userNameError?'border-black':'border-red-600'} rounded-md`}
               type="text"
               value={userName}
               onChange={(e)=>{
                setUserNameError(!userNameError)
                setUserName(e.target.value)
               }}
             />
                  <svg
                  onClick={()=>{
                    
                    setEditUserName(!editUserName)
                  }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="w-6 h-6 mt-2 cursor-pointer ms-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
              </div>
                }
            </div>
            <div className="col-span-1 row-span-1 flex items-start justify-center">
          
             { 
            !editUserName? <PencilIcon
            onClick={()=>{
              setEditUserName(!editUserName)
            }}
             width={17} className=" cursor-pointer me-6 ms-5" /> :
            <Button
              onClick={async ()=>{

                if(/^[a-zA-Z0-9_.-]{1,14}$/.test(userName)){
                  await changeUserName({userName,user_id})
                  setEditUserName(!editUserName)
                }else{
                  setUserNameError(!userNameError)
                }
             
                
              }}
             size="sm">submit</Button>
             }

            </div>

            <div className="col-span-1 row-span-1">
              <h2>Wallet Balance</h2>
            </div>
            <div className="col-span-1 row-span-1">
              <h2>₹ {walletInfo?.amount}</h2>
            </div>
            <div className="col-span-1 row-span-1 flex justify-between">
              <Link to={`/wallet-history/${walletInfo?._id}`}>
                <Button color="white" className="border-2 border-black" size="sm">view history</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Personal Details */}
      </div>
    </div>
  );
};

export default UserDetails;
