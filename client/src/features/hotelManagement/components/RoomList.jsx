import { useParams } from "react-router-dom";
import { useGetRoomsQuery } from "../services/roomsApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRooms } from "../services/hotelListSlice";
import { Link } from "react-router-dom";



import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon,HomeModernIcon } from "@heroicons/react/24/solid";

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
import { NotificationDialog } from "../../../components/modals/NotificationModal";

const TABLE_HEAD = ["SL NO", "Room Type", "Description", "size",'amenities','No Of Rooms','Edit Room','Bathroom Type','Rate','',''];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

const TABS = [
  {
    label: "Listed",
    value: "listed",
    className:'text-green-500'
  },
  {
    label: "Delisted",
    value: "delisted",
    className:'text-red-500'
  },
  {
    label: "Not Registered",
    value: "not-reigstered",
    className:'text-blue-gray-500'
  },
];
 


const RoomList=()=>{

    const {_id:hotel_id}=useParams() 
    const dispatch=useDispatch()
    const {data:rooms,isLoading,isSuccess,isError,error}=useGetRoomsQuery({hotel_id});

    isSuccess && console.log(rooms.response)
    useEffect(()=>{
      isSuccess && dispatch(addRooms(rooms.response))
    },[isSuccess])
    console.log(rooms)

    if(isLoading)  return  <Spinner className="h-12 w-12" />

    if(rooms?.response?.length===0)  return  <h1>Rooms Empty</h1>
    return (
      <>
      <Card className="h-full w-full p-16">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Room List
              </Typography>

            </div>


          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max z-0">
              <TabsHeader>
                {TABS.map(({ label, value,className }) => (
                  <Tab key={value} className={"text-[0.8rem] w-[150px] font-bold "+className} value={value}>
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
        
        <CardBody className="overflow-scroll px-0">
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
              { isSuccess && rooms.response.map(
                ({ _id,description,size,amenities,noOfRooms,bathRoomType,images,rate,createdAt }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  {console.log(description)}
                  return (
                    <tr key={_id}>
                      <td className={classes +" "+"border-r-2"} >
                        <div className="flex items-center  gap-3">
                          <Avatar src={'images[0]'} alt={''} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-thin text-left "
                            >
                              {index+1}
                            </Typography>
         
                          </div>
                        </div>
                      </td>

                      {/* <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {_id}
                          </Typography>
                        </div>
                      </td> */}

                      <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                        
                       {_id}  
                          </Typography>
                        </div>
                      </td>
                      <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal  p-5"
                          >
                        
                         <h2 className="max-w-[500px] break-words">{description}</h2>
                          </Typography>
                        </div>
                      </td>
                      <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                        
                       {size}  
                          </Typography>
                        </div>
                      </td>
                      <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal max-w-[300px] break-words"
                          >
                        
                       {amenities}  
                          </Typography>
                        </div>
                      </td>
                      <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                        
                       {noOfRooms}  
                          </Typography>
                        </div>
                      </td>
                      <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                        
                       <Link to={`/owner/edit-room/${hotel_id}/${_id}`}>Edit Room</Link>
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
                        
                       {rate}  
                          </Typography>
                        </div>
                      </td> */}
                      <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                        
                       {bathRoomType}  
                          </Typography>
                        </div>
                      </td>


                      <td className={classes+" "+"border-r-2"}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                        
                       {rate}  
                          </Typography>
                        </div>
                      </td>

             

                      <td className={classes+" "+'border-r-2'}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            
                            value={'listed'==='listed' ? "Listed" :'listed'==='delisted'? "Delisted":'Not Registered'}
                            color={'listed'==='listed' ? "green" :'listed'==='delisted'? "red":'blue-gray'}
                          />
                        </div>
                      </td>

                      <td className="border-r-2 px-4">
                      <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Button 
                          onClick={()=>{
                          
                          }}
                          >UnList</Button>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                          <Link to={`/owner/edit-hotel/${_id}`}>  <PencilIcon className="h-4 w-4" /> </Link>
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      </>
    )
}

export default RoomList;