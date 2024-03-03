import { Formik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../../components/form/FormInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import { useChangePasswordMutation } from "../services/changePasswordApiSlice";

const ResetPassword = ({ role }) => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [
    changePassword,
    { isError, isLoading, isSuccess, isUninitialized, reset },
  ] = useChangePasswordMutation();

  async function _onSave(values) {
    const { password, repassword } = values;
    console.log(password, repassword);
    const response = await changePassword({ email: email, password: password });
    if (response.data.response) {
      role === "user"
        ? navigate("/login")
        : role === "owner"
        ? navigate("/owner/login")
        : navigate("/admin/login");
    }
  }
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        phone: "",
        password: "",
        repassword: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string()
          .required("Required")
          .min(8, "Password should be 8 chars minimum")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Password is too weak"
          ),
        repassword: Yup.string()
          .required("Required")
          .oneOf([Yup.ref("password")], "Passwords does not match"),
      })}
      onSubmit={(values) => {
        _onSave(values);
        //signup(values)
      }}
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
          className="grid grid-rows-7  gap-8 shadow-2xl p-10 "
        >
          <h1 className="text-2xl font-bold text-center ">
            {"change password"}
          </h1>
          <p className="text-red-600 border-2 text-center text-[0.8rem]">
            {"error"}
          </p>

          <div className="w-72">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password && errors.password}
              success={!errors.password && touched.password ? true : false}
              label={!errors.password ? "password" : errors.password}
              type={"password"}
              name={"password"}
            />
          </div>

          <div className="w-72">
            <FormInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repassword}
              error={
                errors.repassword && touched.repassword && errors.repassword
              }
              success={!errors.repassword && touched.repassword ? true : false}
              label={
                !errors.repassword ? "Re Enter Password" : errors.repassword
              }
              type={"password"}
              name={"repassword"}
            />
          </div>

          {/* <Link to={'/login'}><p className="font-medium text-sm text-blue-900">Already Have an Account?</p></Link> */}
          <div>
            <ButtonDefault
              type={"submit"}
              onSubmit={handleSubmit}
              value={"submit"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ResetPassword;
