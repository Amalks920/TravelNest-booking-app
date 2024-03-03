import { useSelector } from "react-redux";
import PaymentDetails from "./PaymentDetails";
import { selectCheckOutDetails } from "../service/walletCheckOutSlice";
import { useGetAHotelForUserQuery } from "../../browse/services/getAHotelForUserApiSlice";
import { Button, Radio } from "@material-tailwind/react";
import { usePayUsingWalletMutation } from "../service/payUsingWalletApiSlice";
import { useNavigate } from "react-router-dom";
import { selectDiscountAmount } from "../../browse/services/priceSlice";

const WalletPayment = () => {
  const checkoutDetails = useSelector(selectCheckOutDetails);
  const {
    checkInDate,
    checkOutDate,
    hotel_id,
    roomDetails,
    totalNoRooms,
    totalPrice,
    noOfDays,
  } = checkoutDetails;
  console.log(checkoutDetails);
  const navigate = useNavigate();
  const [payUsingWallet, { isError, isLoading, isSuccess }] =
    usePayUsingWalletMutation();

  const discountAmount = useSelector(selectDiscountAmount);

  if (isSuccess) navigate("/payment-success");



  return (
    <div className="grid grid-cols-5 grid-rows-[1fr,1fr,1fr,1fr,1fr] gap-4 w-full min-h-[100vh] md:m-16 mt-2">
      <div className="lg:col-start-1 lg:col-end-4 col-span-full row-start-1 lg:row-end-4 row-end-3  shadow-lg rounded-md border-2">
        <PaymentDetails
          hotel_id={hotel_id}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          totalNoRooms={totalNoRooms}
          roomDetails={roomDetails}
        />
      </div>

      {/* <div className="lg:col-start-4 col-span-full lg:col-end-6  lg:row-start-1 row-start-3 lg:row-end-2 row-end-4 border-2">
        <h2 className="font-bold m-5 text-[1.1rem]">Payment Options</h2>
        <div>
            <div className="flex ms-2">
                <Radio size={'sm'} name="payment" className="w-5 h-5"/>
                <div>
                <h2 className=" mt-3">Pay using Wallet</h2>
                </div>
              
            </div>

        </div>
    </div> */}
      {console.log(roomDetails)}
      <div className="lg:col-start-4 col-span-full lg:col-end-6  lg:row-start-1 row-start-3 lg:row-end-2 row-end-4 border-2">
        <div className="border-2  shadow-md p-5">
          <h2 className="font-bold pb-5  text-left text-[1rem]">
            Price Breakup
          </h2>
          {roomDetails.map(({ roomType, price, noOfRooms }, index) => {
            return (
              <div className="flex pb-2 justify-between">
                <h2 className=" text-[0.9rem] capitalize">
                  {noOfRooms} Rooms x {noOfDays} Days x {price} rs
                </h2>
              </div>
            );
          })}

          <div className="flex justify-between">
            <h2 className=" pt-5 text-[0.9rem]">Discount Amount :</h2>
            <h2 className="font-bold pt-5">{discountAmount}</h2>
          </div>
          <div className="flex justify-between">
            <h2 className=" pt-5 text-[0.9rem]">Total Price :</h2>
            <h2 className="font-bold pt-5">₹ {totalPrice}</h2>
          </div>
        </div>
      </div>
      <div className="lg:col-start-4  col-span-full lg:col-end-6 lg:row-start-2 row-start-5 row-end-4 rounded-md">
        <Button
          className="ms-[240px]"
          onClick={async () => {
            {
              console.log(roomDetails);
            }
            await payUsingWallet({
              totalPrice,
              checkInDate: checkInDate,
              checkOutDate: checkOutDate,
              hotel_id,
              totalNoRooms,
              roomDetails,
              noOfDays,
              discountAmount
            });
          }}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default WalletPayment;
