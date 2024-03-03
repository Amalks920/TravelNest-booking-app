import { Button } from "@material-tailwind/react";
 
export function ButtonDefault(props) {
  return <Button   {...props}   fullWidth>{props.value || 'submit'} </Button>;
}