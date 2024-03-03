import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
  } from "@material-tailwind/react";

  import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
import { useGetAllCouponsQuery } from "../services/couponApiSlice";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import CancelCouponModal from "./CancelCouponModal";

  const TABLE_HEAD = ["Coupon Code", "Description", "Discount Type","Minimum Amount" ,"Discount", "Expiration Date","",""];


  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "Manager",
      org: "Organization",
    },
  ];





const AllCoupons=({couponsLength})=>{
    const [pageNumber,setPageNumber]=useState(1)
    const [open,setOpen]=useState(false)
    const {data:coupons,isError,isFetching,isLoading,isSuccess}=useGetAllCouponsQuery()
    const [id,setId]=useState(null)
    const [status,setStatus]=useState(null)
    
    return (
      <>
        <CancelCouponModal open={open} setOpen={setOpen} id={id} status={!status}/>
        <Card className="h-full w-full p-16">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Coupon List
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <div className="w-full md:w-72 hidden">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
  
        <CardBody className="overflow-scroll px-0 border-e-2 border-l-2 border-r-2">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons?.response?.map(({ _id, code,description,
              discountType,discountAmount,percentageDiscount,minimumAmount,expirationDate,
              maxRedemptions,totalRedemptions,isActive,createdAt
            }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
  
                return (
                  <tr key={_id}>
                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-thin text-[0.8rem] text-left "
                        >
                          {code}
                        </Typography>
                        {/* <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal opacity-70 "
                                    >
                                      {description}
                                    </Typography> */}
                      </div>
                    </td>
  
                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex flex-col w-[50%]  p-0">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-[0.8rem]"
                        >
                       <h2 className="w-[50%]">{description}</h2>   
                        </Typography>
                      </div>
                    </td>
  
                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {discountType}
                        </Typography>
                      </div>
                    </td>
  
                    <td className={classes + " " + "border-r-2"}>
                    <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {minimumAmount}
                        </Typography>
                      </div>
                    </td>
  
                    <td className="border-r-2 px-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <h2>{discountType==='Percentage'?percentageDiscount:discountAmount}</h2>
                      </Typography>
                    </td>

                    <td>
                    <h2 className="text-[0.7rem] text-black ps-5">
                                          {format(expirationDate, "yyyy-MM-dd", {
                                            timeZone: "Asia/Kolkata",
                                          })}
                    </h2>
                    </td>
                    <td>
                    <Link className="text-[0.7rem] text-blue-900 ps-5" to={`/owner/edit-coupon/${_id}`}>
                                     Edit
                    </Link>
                    </td>

                    <td>
                    <h2 className="text-[0.7rem] text-black ps-5">
                                   <Button
                                   onClick={()=>{
                                    setOpen(!open)
                                    setId(_id)
                                    setStatus(isActive)
                                   }}
                                    size="sm">{isActive?'Delist':'List'}</Button>
                    </h2>
                    </td>
                  </tr>


                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 ">
          <Typography variant="small" color="blue-gray" className="font-bold ">
            Page {pageNumber} of {Math.ceil(couponsLength/4)}
          </Typography>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                // if(pageNumber>1 )setPageNumber(pageNumber-1);
              }}
              variant="outlined"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() => {
              //  if(pageNumber<Math.ceil(length.response/4)) setPageNumber(pageNumber+1);
              }}
              variant="outlined"
              size="sm"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      </>
    )
}

export default AllCoupons;