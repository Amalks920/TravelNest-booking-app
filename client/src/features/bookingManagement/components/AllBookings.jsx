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
    Spinner,
  } from "@material-tailwind/react";
  import {
    useGetAllBookingsLengthQuery,
    useGetAllBookingsQuery,
    useGetAllHotelBookingsLengthQuery,
    useGetAllHotelBookingsQuery,
  } from "../services/getAllBookingsApiSlice";
  import { Link, useParams } from "react-router-dom";
  import { useState } from "react";
  
  const TABLE_HEAD = ["Booking Id", "Hotel Name", "User Name", "Status", ""];
  
  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "Manager",
      org: "Organization",
    },
  ];
  
  const AllBookings = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const {
      data: bookings,
      isError,
      isLoading,
      isSuccess,
    } = useGetAllHotelBookingsQuery({pageNumber});

    const {data:bookingLength}=useGetAllHotelBookingsLengthQuery()

    console.log(bookingLength)
  
    // const { data: length } = useGetAllBookingsLengthQuery();
  
    if (isLoading) return <Spinner />;
  
    const bookingData = bookings?.response;
  console.log(bookings)
    return (
      <Card className="h-full w-full p-16">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                All Bookings List
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
              {bookingData?.map(({ _id, hotelName, userName, status }, index) => {
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
                          {_id}
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
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-[0.8rem] "
                        >
                          {hotelName}
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
                          {userName}
                        </Typography>
                      </div>
                    </td>
  
                    <td className={classes + " " + "border-r-2"}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={
                            status === "paid"
                              ? "paid"
                              : status === "checkOut"
                              ? "checkout"
                              : status === "cancelled"
                              ? "cancelled"
                              : "checkIn"
                          }
                          color={
                            status === "paid"
                              ? "green"
                              : status === "checkOut"
                              ? "blue-gray"
                              : status === "checkIn"
                              ? "blue"
                              : "red"
                          }
                        />
                      </div>
                    </td>
  
                    <td className="border-r-2 px-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* <Link to={`/owner/room-list/${_id}`} className="text-[0.56rem] text-center">View Rooms</Link> */}
                        <Link
                          to={`/owner/booking-details/${_id}`}
                          className="text-[0.56rem] text-center"
                        >
                          View Details
                        </Link>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 ">
          <Typography variant="small" color="blue-gray" className="font-bold ">
            Page {pageNumber} of {Math.ceil(bookingLength?.response/4)}
          </Typography>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if(pageNumber>1 )setPageNumber(pageNumber-1);
              }}
              variant="outlined"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if(pageNumber<Math.ceil(bookingLength.response/4)) setPageNumber(pageNumber+1);
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
  };
  
  export default AllBookings;

