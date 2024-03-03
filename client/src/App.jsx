import './App.css'
// import { Navigate, , redirect } from 'react-router-dom'
import {  Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login';
import AuthPageContainer from './layouts/AuthPageContainer';
import PageContainer from './layouts/PageContainer';
import HotelRegistration from './pages/owner/HotelRegistration';
import RoomRegistration from './pages/owner/RoomRegistration';
import HomePage from './pages/user/HomePage.jsx';
import RequireUserAuth from './features/authentication/components/RequireUserAuth';
import { useSelector } from 'react-redux';
import { selectRole, selectToken, selectUserId } from './features/authentication/services/loginSlice';
import RequireOwnerAuth from './features/authentication/components/RequireOwnerAuth';
import CheckAuth from './features/authentication/components/CheckAuth';
import RoomList from './features/hotelManagement/components/RoomList';
import HotelListPage from './pages/owner/HotelListPage';
import RequireAdminAuth from './features/authentication/components/RequireAdminAuth';
import { UsersList } from './features/userManagement/components/UsersList';
import DetailsPage from './pages/admin/DetailsPage.jsx';
import AdminHotelListPage from './pages/admin/AdminHotelListPage.jsx';
import SingleHotelPage from './pages/user/SingleHotelPage.jsx';
import VerifyEmailPage from './pages/VeirfyEmailPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import HotelDetailsPage from './pages/owner/HotelDetailsPage.jsx';
import SearchPage from './pages/user/SearchPage.jsx';
import Success from './features/booking/components/Success.jsx';
import BookingsList from './features/bookingManagement/components/BookingsList.jsx';
import BookingsListPage from './pages/user/BookingsListPage.jsx';
import SingleBookingDetails from './features/booking/components/SingleBookingDetails.jsx';
import BookingDetailsPage from './pages/owner/BookingDetailsPage.jsx';
import UserProfilePage from './pages/user/UserProfilePage.jsx';
import UserAccount from './features/user-profile/components/UserAccount.jsx';
import ChatPage from './pages/user/ChatPage.jsx';
import WalletPage from './pages/user/WalletPage.jsx';
import UserDetailsPage from './pages/user/UserDetailsPage.jsx';
import OwnerChatPage from './pages/owner/OwnerChatPage.jsx';
import HotelReviews from './features/hotelManagement/components/HotelReviews.jsx';
import { useEffect, useState } from 'react';
import io from 'socket.io-client'
import WalletPaymentPage from './pages/user/WalletPaymentPage.jsx';
import WalletHistoryPage from './pages/user/WalletHistoryPage.jsx';
import AllBookingsPage from './pages/owner/AllBookingsPage.jsx';
import SalesReportPage from './pages/admin/SalesReportPage.jsx';
import HotelsByLocationPage from './pages/user/HotelsByLocationPage.jsx';
import AddCouponPage from './pages/owner/AddCouponPage.jsx';
import AllCouponsPage from './pages/owner/AllCouponsPage.jsx';
import OwnerSalesPage from './pages/owner/OwnerSalesPage.jsx';
import OwnerSalesByHotelPage from './pages/owner/OwnerSalesByHotelPage.jsx';
import OwnerHomePage from './pages/owner/OwnerHomePage.jsx';
import AdminHomePage from './pages/admin/AdminHomePage.jsx';
import BookingSalesAdminPage from './pages/admin/BookingSalesAdminPage.jsx';
import EditCouponPage from './pages/owner/EditCouponPage.jsx';

function App() {
  const token = useSelector(selectToken)
  const role = useSelector(selectRole)
  const user_id=useSelector(selectUserId)

	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(()=>{
    const socket = io("http://localhost:4000", {
			query: {
				userId: user_id,
			},
		});

    setSocket(socket);

    socket.on("getOnlineUsers", (users) => {
			setOnlineUsers(users);
      console.log(users)
		});
  
    return () =>{
      console.log('disconnected')
       return socket && socket.close();
      }
  },[user_id])

  return (
    <Routes>
    <Route path="/" element={<AuthPageContainer />}>

      <Route element={<CheckAuth currentRole={'user'}/>} >
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path='verify-email' element={<VerifyEmailPage  role={'user'} isOtpVerified={false} verifySignup={false}/>}></Route>
      <Route path='verify-otp/:email' element={<VerifyEmailPage role={'user'}  isOtpVerified={true} verifySignup={false}/>}></Route>
      <Route path='verify-otp-signup/:email' element={<VerifyEmailPage role={'user'}  isOtpVerified={true} verifySignup={true}/>}></Route>

      <Route path='reset-password/:email' element={<ResetPasswordPage role={'user'}/>}></Route>


      </Route>

      <Route path='/owner' >
      <Route element={<CheckAuth currentRole={'owner'}/>} >
        <Route path="/owner/login" element={<Login />} />
        <Route path="/owner/signup" element={<Signup />} />
        <Route path='/owner/verify-email' element={<VerifyEmailPage  role={'owner'} isOtpVerified={false} verifySignup={false}/>}></Route>
      <Route path='/owner/verify-otp/:email' element={<VerifyEmailPage role={'owner'} isOtpVerified={true} verifySignup={false} />}></Route>
      <Route path='/owner/verify-otp-signup/:email' element={<VerifyEmailPage role={'user'}  isOtpVerified={true} verifySignup={true}/>}></Route>
      <Route path='/owner/reset-password/:email' element={<ResetPasswordPage role={'owner'}/>}></Route>
      </Route>

        <Route element={<RequireOwnerAuth allowedRole={'owner'} />}>
          <Route path='/owner/home' element={<OwnerHomePage/>}></Route>
        <Route path="/owner/register-hotel" element={<HotelRegistration isEditForm={false} />} />
        <Route path="/owner/edit-hotel/:hotel_id" element={<HotelRegistration isEditForm={true} />} />
        <Route path="/owner/edit-room/:hotel_id/:_id" element={<RoomRegistration isEditForm={true} />} />
        <Route path='/owner/hotel-list' element={<HotelListPage/>}></Route>
        <Route path='/owner/room-list/:_id' element={<RoomList/>}></Route>
        <Route path="/owner/register-room/:hotel_id" element={<RoomRegistration isEditForm={false}/>} />
        <Route path='/owner/hotel-details/:hotel_id' element={<HotelDetailsPage/>}></Route>
        <Route path='/owner/bookings-list/:hotel_id' element={<BookingsList/>}></Route>
        <Route path='/owner/booking-details/:booking_id' element={<BookingDetailsPage/>}></Route>
        <Route path='/owner/chats' element={<OwnerChatPage socket={socket} />} ></Route>
        <Route path='/owner/all-bookings' element={<AllBookingsPage/>} ></Route>
        <Route path='/owner/add-coupon' element={<AddCouponPage/>}></Route>
        <Route path='/owner/edit-coupon/:coupon_id' element={<EditCouponPage/>}></Route>
        <Route path='/owner/review/:hotel_id' element={<HotelReviews/>}></Route>
        <Route path='/owner/all-coupons' element={<AllCouponsPage/>}></Route>
        <Route path='/owner/sales-report/:hotel_id' element={<OwnerSalesPage/>}></Route>
        <Route path='/owner/sales-report-hotels' element={<OwnerSalesByHotelPage/>}></Route>

      </Route>
       
      </Route>

      <Route path='/admin'>
        <Route element={<CheckAuth currentRole={'admin'}/>}>
          <Route path='/admin/login' element={<Login/>}></Route>
          <Route path='/admin/verify-email' element={<VerifyEmailPage role={'admin'} isOtpVerified={false}/>}></Route>
      <Route path='/admin/verify-otp/:email' element={<VerifyEmailPage role={'admin'}  isOtpVerified={true}/>}></Route>
      <Route path='/admin/reset-password/:email' element={<ResetPasswordPage role={'admin'}/>}></Route>
        </Route>

        <Route element={<RequireAdminAuth allowedRole={'admin'}/>}>
        <Route path='/admin/home' element={<AdminHomePage/>}></Route>
            <Route path='/admin/users-list' element={<UsersList/>}></Route>
            <Route path='/admin/hotel-details/:_id' element={<DetailsPage/>} > </Route>
            <Route path='/admin/hotel-list' element={<AdminHotelListPage/>} > </Route>
            <Route path='/admin/sales-report' element={<SalesReportPage/>} > </Route>
            <Route path='/admin/booking-sales/:hotel_id' element={<BookingSalesAdminPage/>} > </Route>
          </Route>
      </Route>
       
      </Route>


      <Route
       element={<PageContainer allowedRole={'user'} />}
       >
      <Route path="/home" element={<HomePage />} />
        <Route path="/hotel-details/:hotel_id/:room_id/:checkIn/:checkOut" element={<SingleHotelPage/>} />
        <Route path='/search-page' element={<SearchPage/>}></Route>    
        <Route path='/hotels-by-location/:location' element={<HotelsByLocationPage/>}></Route>    


        <Route element={<RequireUserAuth allowedRole={'user'}/>}>
        <Route path='/payment-success' element={<Success/>}></Route>
        <Route path='/bookings' element={<BookingsListPage/>}></Route>
        <Route path='/single-booking-details/:booking_id' element={<SingleBookingDetails/>}></Route>
        <Route path='/profile-page' element={<UserProfilePage/>}></Route>
        <Route path='/account' element={<UserAccount/>}></Route>
        <Route path='/chat/:owner_id' element={<ChatPage socket={socket}/>}></Route>
        <Route path='/wallet' element={<WalletPage/>}></Route>
        <Route path='/wallet-history/:wallet_id' element={<WalletHistoryPage/>}></Route>
        <Route path='/user-details' element={<UserDetailsPage/>}></Route>
        <Route path='/wallet-payment-page' element={<WalletPaymentPage/>}></Route>
        </Route>

      </Route>
   
  </Routes>
  )
}

export default App
