import { Button } from "@material-tailwind/react";


export const Auth = ({ text, icon }) => {
  return (

      <Button
        size="sm"
        variant="outlined"
        color="blue-gray"
        className="flex items-center gap-3 w-[100%] justify-center"
      >
        <img
          src="https://docs.material-tailwind.com/icons/google.svg"
          alt="metamask"
          className="h-6 w-6"
        />
        Continue with Google
      </Button>

  );
};
