import HotelList from "../../features/hotelManagement/components/HotelList";
import CustomersList from "../../pages/owner/CustomersList";
import HotelDetails from "../../pages/owner/HotelDetails";
import HotelRegistration from "../../pages/owner/HotelRegistration";
import RoomRegistration from "../../pages/owner/RoomRegistration";


const OwnerRoutes=()=>{
    return [
        {
            path:'/owner/hotel-registration',
            element:<HotelRegistration/>
          },
          {
            path:'/owner/users-list',
            element:<CustomersList/>
          },
          {
            path:'/owner/register-hotel',
            element:<HotelRegistration/>
          },
          {
            path:'/owner/register-room',
            element:<RoomRegistration/>
          },
          {
            path:'/owner/hotel-details',
            element:<HotelDetails/>
          },
          {
            path:'/owner/hotel-list',
            element:<HotelList/>
          }
    ]
}

export default OwnerRoutes;