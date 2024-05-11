import { Link, useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { selectToken, setCredentials } from "../services/loginSlice";
import { useLoginMutation } from "../../../services/apiAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import GoogleAuth from "../../../pages/GoogleAuth";
import Toast from "../../../layouts/Toast";

const LoginForm = ({ role }) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();
  const [err, setErr] = useState("");

  const _onSave = async (values) => {
    try {
      values.role = role;
      const userData = await login(values).unwrap();
      
      dispatch(setCredentials({ ...userData.data }));

      // if (isSuccess) {
      //   console.log(console.log(token));
      // }

      if (isError) {
        console.log(error);
        setErr(error);
      }

      navigate(
        role === "user"
          ? "/home"
          : role === "owner"
          ? "/owner/home"
          : role === "admin"
          ? "/admin/home"
          : null
      );
    } catch (error) {
      setErr(error?.data?.message || "login failed");
    }
  };


  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email Required"),
        password: Yup.string()
          .required("Required")
          .min(8, "Password is too short - should be 8 chars minimum")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "use mix of uppercase,lowercase,numbers, and symbols"
          ),
      })}
      onSubmit={(values) => _onSave(values)}
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
          className="grid grid-rows-8 gap-8 shadow-2xl  p-10 border-t-2 border-t-gray-100 rounded-3xl h-[52%] pb-[9%]"
        >


          <div className="row-span-1 col-span-full flex-col   justify-center flex">
            {/* <GoogleAuth role={role} setErr={setErr} /> */}
          {role==='owner' && <h4 className="text-[0.8rem] text-center">Demo Email - owner@gmail.com</h4 > }
          {role==='owner' && <h4 className="text-[0.8rem] text-center">Demo password - Amalks7674@</h4 >}
          </div>
         {/* {role=='user' && <div className="row-span-1 col-span-full text-blue-900 justify-center text-[0.9rem]">
             <a href="/owner/login">Login as owner</a> 
          </div>} */}

          <div className="row-span-1 mt-[10%]">
{ err &&           <h2 className="text-red-700 capitalize text-sm text-center text-[0.8rem]  w-full">
              <Toast message={err}/>
             
            </h2>}
            {console.log(errors)}
          </div>

          <div className="row-span-1 w-72 mt-[10%]">
            <FormInput
              label={!errors.email ? "Email" : errors.email}
              name={"email"}
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              success={!errors.email && touched.email ? true : false}
            />
          </div>

          <div className="row-span-1 w-72 mt-[25%]">
            <FormInput
              label={!errors.password ? "Password" : errors.password}
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password && errors.password}
              success={!errors.password && touched.password ? true : false}
            />
          </div>

          <div className="row-span-1 flex justify-between mt-[45%] mx-4">
          <Link to={role === "user" ? "/signup" : "/owner/signup"}>
            <p className="  font-light -mt-5 text-black text-[0.8rem]">
              Signup?
            </p>
          </Link>
          <Link
            to={
              role === "user"
                ? "/verify-email"
                : role === "owner"
                ? "/owner/verify-email"
                : "/admin/verify-email"
            }
            className="-mt-5"
          >
            <p className="font-medium text-black text-[0.8rem]">
              Forgot Password?
            </p>
          </Link>
          </div>

          <div className="row-span-1 mt-[35%] pt-1">
            <ButtonDefault
              loading={isLoading}
              value="submit"
              type={"submit"}
              onSubmit={handleSubmit}
              disabled={isSubmitting}
            />
             {role==='user' && <a className="border-2 absolute  border-black top-[600px] left-[420px] h-[40px] w-[330px]  text-[0.8rem] text-black font-bold text-center pt-2
              rounded-md text ms-[180px] mt-3" href="/owner/login">Login as owner</a> }
          </div>
           
        </form>

      )}
    
    </Formik>
  );
};

export default LoginForm;
