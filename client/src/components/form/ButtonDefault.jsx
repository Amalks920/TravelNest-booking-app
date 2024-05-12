import { Button } from "@material-tailwind/react";
 
export function ButtonDefault(props) {

  {console.log('button default rendering')}
  return <Button   {...props}   fullWidth>{props.value || 'submit'} </Button>;
}