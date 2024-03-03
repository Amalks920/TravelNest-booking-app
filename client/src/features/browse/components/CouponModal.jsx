import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useGetAllCouponsForUserQuery, useGetAllCouponsQuery } from "../services/getCouponApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCouponCode, selectPrice, updateCouponCode } from "../services/priceSlice";

function CouponModal({ couponModalOpen, setCouponModalOpen }) {
  const {
    data: coupons,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetAllCouponsForUserQuery();

  const price = useSelector(selectPrice);
  const couponCode = useSelector(selectCouponCode);
  const dispatch = useDispatch();
  const handleOpen = () => setCouponModalOpen((cur) => !cur);

  return (
    <>
      <Dialog
        size="xs"
        open={couponModalOpen}
        handler={setCouponModalOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Coupon Modal
            </Typography>

            {coupons?.response?.map(
              (
                {
                  code,
                  description,
                  discountType,
                  discountAmount,
                  percentageDiscount,
                  minimumAmount
                },
                index
              ) => {
                return (
                  <Typography
                    className="mb-3 font-normal border-2 min-h-[100px] p-2 "
                    variant="paragraph"
                    color="gray"
                  >
                    <div className="flex justify-between mt-2">
                      <h2 className="uppercase">{code}</h2>
                      {
                        <button
                          onClick={() => {

                            if(minimumAmount>price){
                              return alert(`minimum amount should be ${ minimumAmount} `)
                            }
                           
                            if(couponCode!==code ){
                              
                              dispatch(
                                updateCouponCode({
                                  code: code,
                                  discount:discountAmount,
                                  discountType,
                                })
                              );
                            }

                          }}
                          className={`border-2  px-5   capitalize text-[0.8rem] py-1 font-bold rounded-md ${
                            couponCode !== code ? "text-red-700" : "text-black"
                          }`}
                        >
                          {" "}
                          {couponCode !== code ? "Apply" : "Applied"}
                        </button>
                      }
                    </div>

                    <div className="mt-2">
                      <h2 className="font-bold">{description}</h2>
                    </div>
                  </Typography>
                );
              }
            )}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export default CouponModal;
