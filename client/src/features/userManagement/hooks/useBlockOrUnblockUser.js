import { useBlockOrUnblockUserMutation } from "../services/blockOrUnblockUserApiSlice"



const useBlockOrUnblockUser=()=>{

    const[blockOrUnblockUser,{isError,isLoading,isSuccess}]=useBlockOrUnblockUserMutation();

    return  {
        blockOrUnblockUser,
        userBlockOrUnblockError:isError,
        userBlockOrUnblockIsLoading:isLoading,
        userBlockOrUnblockIsSuccess:isSuccess
    }

}

export default useBlockOrUnblockUser;