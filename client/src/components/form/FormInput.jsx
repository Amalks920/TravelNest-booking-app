import { Input } from "@material-tailwind/react";
import { Formik } from "formik";


 
export function FormInput(props) {
  return (
    // w-72
    // <div className="w-80">
<>
      <Input {...props}
      color="blue-gray"
      size="md"
      outline={""}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value}
      error={props.error}
      success={props.success}
         />
      </>
    // </div>
    
  );
}