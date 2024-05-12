import { Link, useNavigate } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { FormInput } from "../../../components/form/FormInput";
import { Formik } from "formik";
import {  setCredentials } from "../services/loginSlice";
import { useLoginMutation } from "../../../services/apiAuthSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import GoogleAuth from "../../../pages/GoogleAuth";
import Toast from "../../../layouts/Toast";
import { loginValidation } from "../../../utils/validationObjects";

const LoginForm = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [err, setErr] = useState("");

  const _onSave = async (values) => {
    try {
      values.role = role;
      const userData = await login(values).unwrap();

      dispatch(setCredentials({ ...userData.data }));


      if (isError) {
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
      validationSchema={loginValidation}
      onSubmit={(values) => _onSave(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="grid grid-rows-8 gap-8 shadow-2xl m-[1%] 
            p-10 border-t-2 border-t-gray-100 rounded-3xl h-[52%] sm:h-[60%]  md:h-[52%] sm:  pb-[9%]"
        >
          
          <div className="row-span-1 col-span-full justify-center flex ">
            <GoogleAuth role={role} setErr={setErr} />
            {/* {role === 'owner' && <h4 className="text-[0.8rem] text-center">Demo Email - owner@gmail.com</h4 >}
            {role === 'owner' && <h4 className="text-[0.8rem] text-center">Demo password - Amalks7674@</h4 >} */}
          </div>
          {/* {role=='user' && <div className="row-span-1 col-span-full text-blue-900 justify-center text-[0.9rem]">
             <a href="/owner/login">Login as owner</a> 
          </div>} */}

          <div className="row-span-1 mt-[10%]">
            {err && <h2 className="text-red-700 capitalize text-sm text-center text-[0.8rem]  w-full">
              <Toast message={err} />
            </h2>}
          </div>

          <div className="row-span-1 sm:w-72   sm:mt-[30px] mt-[5%]">
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

          <div className="row-span-1 w-72 sm:mt-[65px] mt-[15%]">
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

          <div className="row-span-1 flex justify-between mt-[30%] sm:mt-[44%] mx-4">
            <Link to={role === "user" ? "/signup" : "/owner/signup"}>
              <p className=" -mt-5 font-bold text-black text-[0.8rem]">
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
              <p className="font-bold text-black text-[0.8rem]">
                Forgot Password?
              </p>
            </Link>
          </div>

          <div className="row-span-1 mt-[16%] sm:mt-[34%] pt-1">
            <ButtonDefault
              loading={isLoading}
              value="submit"
              type={"submit"}
              onSubmit={handleSubmit}
              disabled={isSubmitting}
            />
          </div>

        </form>

      )}

    </Formik>
  );
};

export default LoginForm;
