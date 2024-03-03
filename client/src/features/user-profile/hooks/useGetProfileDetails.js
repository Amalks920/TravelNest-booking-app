import {
  useGetUserInfoForUserQuery,
  useGetWalletDetailsQuery,
} from "../services/getUserInfoApiSlice";

const useGetProfileDetails = (user_id) => {
  const {
    data: userInfo,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
  } = useGetUserInfoForUserQuery({user_id});

  const {
    data: walletInfo,
    isError: isWalletError,
    isFetching: isWalletFetching,
    isLoading: isWalletLoading,
    isSuccess: isWalletSuccess,
    isUninitialized: isWalletUninitialized,
  } = useGetWalletDetailsQuery({user_id});


  return {
    userInfo:userInfo?.response,
    isUserInfoError:isError,
    isUserInfoSuccess:isSuccess,
    isUserInfoLoading:isLoading,
    isUserInfoUnInitialized:isUninitialized,

    walletInfo:walletInfo?.response,
    isWalletError,
    isWalletLoading,
    isWalletFetching,
    isWalletUninitialized
  }
};

export default useGetProfileDetails;
