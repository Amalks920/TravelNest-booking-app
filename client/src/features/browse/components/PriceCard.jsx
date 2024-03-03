import DatePicker from "../../../components/form/DatePicker";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import {
  selectPrice,
  selectNoOfRooms,
  selectTotalPrice,
  selectCheckedRooms,
  updateCheckIn,
  updateCheckOut,
  selectHotelId,
  selectTotalNumberOfRoom,
  // selectCheckIn,
  // selectCheckOut,
  selectRoomType,
  updateNoOfRooms,
  updatePrice,
  selectAvailableRoom,
  selectNoOfDays,
  selectCouponCode,
  selectDiscountAmount,
  selectDisocunt,
  selectDisocuntType,
} from "../services/priceSlice";

//import { selectCheckIn,selectCheckOut } from "../../../services/searchSlice";
import { selectCheckIn, selectCheckOut } from "../services/priceSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import useHandlePayment from "../hooks/useHandlePayment";
import {
  useGetWalletAmountQuery,
  usePaymentMutation,
} from "../services/paymentApiSlice";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { isMatch } from "react-day-picker";
import {
  selectRole,
  selectToken,
  selectUserId,
} from "../../authentication/services/loginSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateCheckOutDetails } from "../../walletPayment/service/walletCheckOutSlice";

const  PriceCard = ({ rate, roomType, hotel_id, room_id, open, setOpen,couponModalOpen, setCouponModalOpen}) => {
  const selectedCheckInDate = useSelector(selectCheckIn);
  const selectedCheckOutDate = useSelector(selectCheckOut);
  const totalAvailableRooms = useSelector(selectAvailableRoom);
  const price = useSelector(selectPrice);

  const noOfDays = useSelector(selectNoOfDays);
  const user_id = useSelector(selectUserId);
  const couponCode=useSelector(selectCouponCode)
  const discountAmount=useSelector(selectDiscountAmount)
 

  const [payment, { isError, isLoading, isSuccess, error }] =
    usePaymentMutation();

  const { data: wallet, isSuccess: isSuccessWallet } = useGetWalletAmountQuery({
    user_id,
  });

  const [checkInDate, setCheckInDate] = useState(selectedCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(selectedCheckOutDate);
  const [noOfRooms, setNoOfRooms] = useState(1);
  const role = useSelector(selectRole);
  const token = useSelector(selectToken);
  const discount=useSelector(selectDisocunt)
  const discountType=useSelector(selectDisocuntType)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(room_id, roomType, noOfRooms, price);
  const roomDetails = [
    { id: room_id, roomType: roomType, noOfRooms: noOfRooms, price: price },
  ];

  useEffect(() => {
    
    dispatch(updatePrice(rate * Number(noOfRooms) ));
  }, [noOfRooms]);

  const handlePayment = async (id) => {
    try {
      const stripe = await loadStripe(
        "pk_test_51McT8uSJpQVF6jBTNlHodKtVtviDTJ5I2ApQv9ag4Nr4iwvzERcDxveeDcbIWA8TYpPIM2XqbYqSjAtlUfa7kldc00nshn8huB"
      );
      stripe.redirectToCheckout({
        sessionId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        checkInDate: selectedCheckInDate,
        checkOutDate: selectedCheckOutDate,
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

      
        <div className="grid grid-flow-row grid-cols-[auto,auto] m-3 top-0 w-full sticky self-start  ps-[11px] 
        ">
          <div className="col-span-2 pt-[20px]  pb-[50px]">
            <h2 className=" text-[1.6rem]">
              ₹ {rate} <span className="font-light text-[1.1rem]">per day</span>
            </h2>
          </div>
          <div className="col-span-2 mt-5 flex flex-wrap pe-2">

            <div className="  flex ">
              <input
                onClick={() => {
                  setOpen(!open);
                }}
                className=" border-[0.7px] cursor-pointer ps-4 border-gray-600 h-[60px] w-[170px] rounded-tl-lg"
                type="date"
                value={selectedCheckInDate}
                datePassed={selectedCheckInDate}
                setDate={setCheckInDate}
                name="checkInDate"
                label={"Check in"}
                readOnly
              />

              <input
                onClick={() => {
                  setOpen(!open);
                }}
                type="date"
                className="h-[60px] border-l-0 ps-4 cursor-pointer  border-[0.7px]  w-[170px]  border-gray-600 rounded-sm rounded-tr-lg"
                value={selectedCheckOutDate}
                datePassed={selectedCheckOutDate}
                //  setDate={setCheckOutDate}
                name="checkOutDate"
                label={"Check out"}
                readOnly
              />
            </div>
            <div className="">
              {totalAvailableRooms >= 0 ? (
                <div className=" px-1">
                </div>
              ) : null}
            </div>

            <div className="w-full ">
              <select
                name="noOfRooms"
                value={noOfRooms}
                onChange={(e) => {
                  setNoOfRooms(e.target.value);
                  dispatch(updateNoOfRooms(e.target.value));
                }}
                className="bg-white w-[98.1%] ps-5 h-[60px] border-t-0  border-[0.7px] border-gray-600 rounded-b-lg"
              >
                <option value="0" disabled={true}>
                  0
                </option>
                <option value="1" disabled={totalAvailableRooms < 1}>
                  1
                </option>
                <option value="2" disabled={totalAvailableRooms < 2}>
                  2
                </option>
                <option value="3" disabled={totalAvailableRooms < 3}>
                  3
                </option>
                <option value="4" disabled={totalAvailableRooms < 4}>
                  4
                </option>
                <option value="5" disabled={totalAvailableRooms < 5}>
                  5
                </option>
              </select>
            </div>


            
            <Button
              disabled={
                totalAvailableRooms <= 0 || noOfRooms === null || noOfRooms == 0 || price === null
              }
              onClick={async () => {
                if (token && role === "user") {
                  const response = await payment({
                    roomDetails,
                    totalPrice: Math.round(price),
                    checkInDate: selectedCheckInDate,
                    checkOutDate: selectedCheckOutDate,
                    hotel_id,
                    totalNoRooms: noOfRooms,
                    noOfDays: noOfDays,
                    couponCode:couponCode
                  });

                  dispatch(updateCheckIn(checkInDate));
                  dispatch(updateCheckOut(checkOutDate));
                  handlePayment(response.data.id);
                } else {
                  navigate("/login");
                }

         
                // bg-[#E41D56]
              }}
              
              className="w-[100%] -ms-[2px] mt-5 py-4 bg-gray-800  border-2"
            >
              Pay Using Card
            </Button>
            <div className="flex justify-between w-full">


            <h2
            onClick={
            ()=>{
              setCouponModalOpen(!couponModalOpen)
            }}
             className=" text-[0.9rem] cursor-pointer text-black pt-[7px]">
              Apply Coupon?
            </h2>
            <h2
              onClick={() => {
                dispatch(
                  updateCheckOutDetails({
                    checkInDate: selectedCheckInDate,
                    checkOutDate: selectedCheckOutDate,
                    roomDetails: roomDetails,
                    totalPrice: Math.round(price),
                    totalNoRooms: noOfRooms,
                    hotel_id: hotel_id,
                    noOfDays: noOfDays,
                  })
                );
              }}
              className="text-center ps-2  mt-2 text-[0.9rem] text-black cursor-pointer capitalize"
            >
              {wallet?.response[0]?.amount > price ? (
                <Link to={"/wallet-payment-page"}>Pay Using Wallet</Link>
              ) : null}
            </h2>
            </div>  
            <div className="mt-[70px]">

            </div>
            <div className="mt-[10px] flex flex-col justify-center items-center  w-full">
              <div className="w-[100%] flex  justify-between mx-3 px-2">
                <h2 className="font-extralight text-[1rem]">price :</h2>
                <h2 className="me-3 font-extralight text-[1rem]">₹ {Math.round(price)}</h2>
              </div>

              <div className="w-[100%] flex  justify-between mx-3 px-2 mt-[20px]">
                <h2 className="font-extralight text-[1rem]">Discount :</h2>
                <h2 className="me-3 font-bold text-[1rem] text-green-700">{ discount } {discountType==='Fixed'?'':discountType==='Percentage'?'%':null} </h2>
              </div>


            </div>
          </div>
        </div>
   
      )}
    </Formik>
  );
};

export default PriceCard;
