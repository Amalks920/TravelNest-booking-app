
import { useLocation } from "react-router-dom";
import RegistrationForm from "../../features/hotelRegistration/components/RegistrationForm";

const HotelRegistration=({isEditForm})=>{

    return<RegistrationForm isEditForm={isEditForm}/>
 
}

export default HotelRegistration;