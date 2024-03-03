import { Link, useNavigate, useParams } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { useVerifyEmailMutation, useVerifyEmailSignupMutation } from "../services/verifyEmailApiSlice";
import { useDispatch } from "react-redux";
import { useVerifyOtpMutation } from "../services/verifyOtpApiSlice";
import { useEffect, useRef, useState } from "react";

const VerifyEmailOrPhone = ({ role, isOtpVerified,verifySignup }) => {
  const navigate = useNavigate();

  const navigateToVerifyOtpPage = () => navigate("/verify-otp");
  const { email } = useParams();
  const emailRef = useRef(null);
  const [error, setError] = useState("");
  const [verifyEmail, { isError, isLoading, isSuccess }] =
    useVerifyEmailMutation();

  const [verifyEmailSignup]=useVerifyEmailSignupMutation();

  const emailSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email Required"),
  });

  const otpSchema = Yup.object({
    otp: Yup.string().matches(/^\d{6}$/, "Invalid OTP").required("OTP is required"),
  });

  const selectedSchema = !isOtpVerified ? emailSchema : otpSchema


  const [
    verifyOtp,
    {
      isError: verifyOtpIsError,
      isLoading: verifyOtpIsLoading,
      isSuccess: verifyOtpIsSuccess,
      error: verifyOtpError,
    },
  ] = useVerifyOtpMutation();



const [seconds, setSeconds] = useState(60);
const [isInputDisabled,setIsInputDisabled]=useState(false);

const onTimeout=()=>{
 // setIsInputDisabled(true)
}

useEffect(() => {
  const interval = setInterval(() => {
    setSeconds((prevSeconds) => {
      if (prevSeconds<=0 ) {
        
        clearInterval(interval);
        onTimeout();
        return 0;
      }
      return prevSeconds - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [onTimeout]);





  const _onSave = async (values) => {
    console.log("_onSave");
    try {
      const response =  !verifySignup? await verifyEmail(values).unwrap():await verifyEmailSignup(values).unwrap();

      console.log(response);
      
      if (response.isOtpSend) {

        setIsInputDisabled(false)


        emailRef.current = values.email;
        console.log("navigate to otp page");
       if(verifySignup) window.location.reload(true)
          if(verifySignup && role==='user') return  navigate(`/verify-otp-signup/${emailRef.current}`)
        role === "user"
          ? navigate(`/verify-otp/${emailRef.current}`)
          : role === "owner"
          ? navigate(`/owner/verify-otp/${emailRef.current}`)
          : navigate(`/admin/verify-otp/${emailRef.current}`);
        
      }
    } catch (error) {
      setError(error.data.message);
      console.log(error);
    }
  };

  const handleVerifyOtp = async (values) => {
    try {
      const response = await verifyOtp({ email: email, otp: values.otp });
      console.log(response);
      if (response.data) {
        setIsInputDisabled(false)
        if(verifySignup){
          if(role==='user'){
         return   navigate('/login')
         }else{
         return   navigate('/owner/login')
         }
         }
       // navigate(`/reset-password/${email}`);
       role === "user"
       ? navigate(`/reset-password/${email}`)
       : role === "owner"
       ? navigate(`/owner/reset-password/${email}`)
       : navigate(`/admin/reset-password/${email}`);
      }
    } catch (error) {
      setError(error.data.message);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={!isOtpVerified ? { email: "" } : { otp: null }}
      // validationSchema={Yup.object({
      //   email: Yup.string()
      //     .email("Invalid email address")
      //     .required("Email Required"),
      //   otp: Yup.string(),
      //   //.matches(/^\d{6}$/,'invalid otp').required('otp is required')
      // })}
      validationSchema={selectedSchema}
      onSubmit={(values) =>
        !isOtpVerified ? _onSave(values) : handleVerifyOtp(values)
      }
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="grid grid-rows-1  gap-8 shadow-2xl p-10 border-t-2 border-t-gray-100"
        >
          <p className="text-center font-bold">
            {!isOtpVerified ? "Enter Email/Phone" : "Verify OTP"}
          </p>
          <p className="text-center  text-red-900">{error}</p>
          <div className="w-80 s">
            {!isOtpVerified ? (
              <FormInput
                label={!errors.email ? "Email" : errors.email}
                type={"email"}
                name={"email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email && touched.email && errors.email}
                success={!errors.email && touched.email ? true : false}
              />
            ) : (
              <FormInput
                label={!errors.otp ? "otp" : errors.otp}
                type={"number"}
                name={"otp"}
                
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.otp}
                error={errors.otp && touched.otp && errors.otp}
                success={!errors.otp && touched.otp ? true : false}
               disabled={isInputDisabled}
              />
            )}
          </div>

          <div>
            <ButtonDefault
             // onClick={() => console.log("clll")}
              type={"submit"}
              onSubmit={handleSubmit}
              disabled={isSubmitting}
            />
          </div>
        { seconds>0 ? <h1>{seconds}s</h1>:
          <h1 className={`cursor-pointer ${!isOtpVerified && 'hidden'}`} onClick={
             ()=>{
              setIsInputDisabled(false)
              _onSave({email:email})

             }
          }
          >Resend otp</h1>}
        </form>
      )}
    </Formik>
  );
};

export default VerifyEmailOrPhone;
