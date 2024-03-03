import VerifyEmailOrPhone from "../features/authentication/components/VerifyEmailOrPhone";


const VerifyEmailPage=({role,isOtpVerified,verifySignup})=>{

    return (
        <VerifyEmailOrPhone role={role} isOtpVerified={isOtpVerified} verifySignup={verifySignup}/>
    )
}


export default VerifyEmailPage;