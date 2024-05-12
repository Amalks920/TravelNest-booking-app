import * as Yup from "yup";

export const  loginValidation = Yup.object(
    {
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "should be 8 characters minimum")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "use mix of uppercase,lowercase,numbers & symbols"
        ),
    }
  )

  export const signupValidation = Yup.object({
    username: Yup.string()
      .min(6, "username is too short - should be 6 chars minimum")
      .required(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone is required'),
    
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password should be 8 chars minimum")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "at least one Uppercase,Lowercase,Number and a special character"
      ),
    repassword: Yup.string()
      .required("Password Required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  })