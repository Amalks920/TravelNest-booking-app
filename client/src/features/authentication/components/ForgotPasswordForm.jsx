import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormInput } from "../../../components/form/FormInput";
import { ButtonDefault } from "../../../components/form/ButtonDefault";
import * as Yup from 'yup'

const ForgotPasswordForm = () => {
    return (
        <Formik
            initialValues={{ oldpassword: "", newpassword: "" }}
            validationSchema={Yup.object({
                oldpassword: Yup.string()
                    .required('Required')
                    .min(8, 'Password is too short - should be 8 chars minimum')
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        'Include at least one Uppercase,Lowercase,Number and  a special character'
                    ),
                    newpassword: Yup.string()
                    .required('Required')
                    .min(8, 'Password is too short - should be 8 chars minimum')
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        'Include at least one Uppercase,Lowercase,Number and  a special character'
                    )
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
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit} className="grid grid-rows-7  gap-8 shadow-2xl p-10">

                    <div><FormInput
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.oldpassword}
                                     error={errors.oldpassword && touched.oldpassword && errors.oldpassword}
                                     success={!errors.oldpassword && touched.oldpassword ? true : false}
                     label={'Enter Old Password'} type={'password'} name={"oldpassword"} /></div>

                    <div><FormInput
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.newpassword}
                                     error={errors.newpassword && touched.newpassword && errors.newpassword}
                                     success={!errors.newpassword && touched.newpassword ? true : false}
                     label={'Enter New Password'} type={'password'} name={"newpassword"} /></div>
                    <div><Link to={'/verify-email-or-phone'}><ButtonDefault type={'submit'} onSubmit={handleSubmit} disabled={isSubmitting}/></Link></div>
                </form>

            )}
        </Formik>
    )
}

export default ForgotPasswordForm;