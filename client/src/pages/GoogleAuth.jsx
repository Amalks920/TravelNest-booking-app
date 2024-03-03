import React from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleSignInMutation } from '../services/googleAuthApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authentication/services/loginSlice';
import { useNavigate } from 'react-router';

const GoogleAuth = ({role,setErr}) => {

const dispatch=useDispatch()
const navigate=useNavigate()

const [googleSignin,{isError,isLoading,isSuccess,isUninitialized}]=useGoogleSignInMutation()

return (

<GoogleOAuthProvider  clientId={'645023873338-gn2npci9erdpl5hvs9fsuuh6pa6v1grm.apps.googleusercontent.com'}>
<GoogleLogin
onSuccess={async credentialResponse => {

    const response=await googleSignin({credentialResponse,role})
    console.log(response)

    if(response.error){
        setErr(response.error.data.error)
    } 
    console.log('response google auth');
    dispatch(setCredentials({ ...response.data.foundUser,accessToken:response.data.accessToken }));
    
    navigate(
        role === "user"
          ? "/home"
          : role === "owner"
          ? "/owner/register-hotel"
          : role === "admin"
          ? "/admin/home"
          : null
      );

console.log(credentialResponse);
}}
onError={() => {
console.log('Login Failed');
}}
/>
</GoogleOAuthProvider>
 
);
};

export default GoogleAuth;