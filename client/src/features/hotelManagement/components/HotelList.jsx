import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  PencilIcon,
  UserPlusIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import {
  useGetHotelsLengthQuery,
  useGetHotelsQuery,
} from "../services/hotelsSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addHotels } from "../services/hotelListSlice";
import { selectUserId } from "../../authentication/services/loginSlice";
import { useGetHotelsForAdminQuery } from "../services/HotelListAdmin";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { useState } from "react";

const TABS = [
  {
    label: "Listed",
    value: "listed",
    className: "text-green-500",
  },
  {
    label: "Delisted",
    value: "delisted",
    className: "text-red-500",
  },
  {
    label: "Not Registered",
    value: "not-reigstered",
    className: "text-blue-gray-500",
  },
];

const TABLE_HEAD = ["Hotel Name", "Location", "Status", "", "", ""];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
];

function HotelList() {
  const [pageNumber, setPageNumber] = useState(1);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const {
    data: hotels,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHotelsQuery({ userId, pageNumber });
  console.log(pageNumber)

  const { data: hotelsLength } = useGetHotelsLengthQuery({ userId });
  //   const  {
  //     hotels,
  //     isError,
  //     isFetching,
  //     isLoading,
  //     isSuccess
  // }=useGetHotelsForAdminQuery()

  console.log(hotels);
  isSuccess && dispatch(addHotels(hotels.response));

  if (hotels?.response?.length === 0)
    return <h1 className="font-bold">Hotel List is Empty.</h1>;
  return (
    <Card className="h-full w-full p-16">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Hotels list
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max z-0 hidden">
            <TabsHeader>
              {TABS.map(({ label, value, className }) => (
                <Tab
                  key={value}
                  className={"text-[0.8rem] w-[150px] font-bold " + className}
                  value={value}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
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
            {hotels?.response?.map(
              (
                {
                  _id: hotel_id,
                  hotelName,
                  description,
                  images,
                  location,
                  status,
                  createdAt,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={hotel_id}>
                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex items-center  gap-3">
                        <Avatar
                          src={IMAGE_BASE_URL + images[0]}
                          alt={""}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-thin text-[0.8rem] text-left max-w-[100px]"
                          >
                            {hotelName}
                          </Typography>
                          {/* <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70 "
                            >
                              {description}
                            </Typography> */}
                        </div>
                      </div>
                    </td>

                    <td className={classes + " " + "border-r-2"}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-[0.8rem] max-w-[100px]"
                        >
                          {location}
                        </Typography>
                      </div>
                    </td>

                    {/* <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                        
                       {createdAt}  
                          </Typography>
                        </div>
                      </td> */}

                    <td className={classes + " " + "border-r-2"}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={
                            status === "listed"
                              ? "Listed"
                              : status === "delisted"
                              ? "Delisted"
                              : "Unregistered"
                          }
                          color={
                            status === "listed"
                              ? "green"
                              : status === "delisted"
                              ? "red"
                              : "blue-gray"
                          }
                        />
                      </div>
                    </td>
                    {/* <td className={classes+" "+'border-r-2'}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          
                        </Typography>

                      </td> */}
                    <td className="border-r-2 px-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Link
                          to={`/owner/register-room/${hotel_id}`}
                          className="text-[0.56rem] text-center"
                        >
                          Add Rooms
                        </Link>
                      </Typography>
                    </td>

                    <td className="border-r-2 px-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* <Link to={`/owner/room-list/${_id}`} className="text-[0.56rem] text-center">View Rooms</Link> */}
                        <Link
                          to={`/owner/hotel-details/${hotel_id}`}
                          className="text-[0.56rem] text-center"
                        >
                          View Details
                        </Link>
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Link
                        to={`/owner/bookings-list/${hotel_id}`}
                        className="text-[0.56rem] text-center"
                      >
                        View Bookings
                      </Link>
                      {/* <Tooltip content="Edit Hotel">
                          <IconButton variant="text">
                          <Link to={`/owner/edit-hotel/${hotel_id}`}>  <PencilIcon className="h-4 w-4" /> </Link>
                          </IconButton>
                        </Tooltip> */}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {pageNumber} of {Math.ceil(hotelsLength?.response / 3)}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (pageNumber > 1) setPageNumber(pageNumber - 1);
            }}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
            
              if (pageNumber < Math.ceil(hotelsLength.response / 3))
                setPageNumber(pageNumber + 1);
            }}
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default HotelList;
