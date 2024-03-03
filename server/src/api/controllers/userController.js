const { fetchAllUsersHelper, blockOrUnblockUserHelper, checkUserBlockedOrNotHelper, getUserDetailsForProfileHelper, getAllUsersLengthHelper, editUserNameHelper, editEmailHelper } = require("../helpers/userHelper")
const { userWalletDetailsHelper, getWalletHistoryHelper, getWalletHistoryLengthHelper } = require("../helpers/walletHelper")


const getAllUsers=async (req,res,next)=>{
    try {
        const pageNumber=req.query.pageNumber;
       const response=await fetchAllUsersHelper(pageNumber)
       res.status(200).json({response})
    } catch (error) {
        res.status(200).json({error})
    }
}

const getAllUsersLength=async (req,res)=>{
    try {
        const response =await  getAllUsersLengthHelper()
        res.status(200).json({response});
    } catch (error) {
        res.status(500).json({error})
    }
}

const blockOrUnblockUser=async (req,res,next)=>{
    let user_id=req.params.user_id
    let isBlocked=req.body.isBlocked
    try {
        const response=await blockOrUnblockUserHelper(user_id,isBlocked)
        res.status(200).json({response});
    } catch (error) {
        res.status(200).json({error})
    }
}

const checkIfUserBlockedOrNot=async (req,res,next)=>{
    let user_id=req.params.user_id;

    try { 
        const response=await checkUserBlockedOrNotHelper(user_id)
        console.log(response)
        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}

const getUserDetailsForProfile= async (req,res,next)=>{

    const user_id=req.params.user_id;

    try {
       const response= await getUserDetailsForProfileHelper(user_id)
       res.status(200).json({response}) 
    } catch (error) {
        console.log(error)
        res.status(404).json({error})
    }
}

const getUserWalletDetails= async (req,res,next)=>{
    const user_id=req.params.user_id
    try {
    const response= await userWalletDetailsHelper(user_id)
    console.log(response)
    res.status(200).json({response});
    } catch (error) {
        console.log(error)
    res.status(404).json({error})
    }
}


const getWalletHistory=async (req,res,next)=>{
    const wallet_id=req.params.wallet_id;
    const pageNumber=req.params.pageNumber;
    try {
        
    const response=await getWalletHistoryHelper(wallet_id,pageNumber)

    res.status(200).json({response});
    } catch (error) {
        res.status(500).json({error})
    }
}


const getWalletHistoryLength=async (req,res)=>{
    const wallet_id=req.params.wallet_id

    try {
      const response=await getWalletHistoryLengthHelper(wallet_id)
      res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const editUserName= async (req,res)=>{

    try {
        const user_id=req.params.user_id
        const userName=req.body.userName
        console.log(req.body)
        const response=await editUserNameHelper(user_id,userName)
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const editEmail=async (req,res) => {
    try {
        const email=req.body.email;
        const user_id=req.body.user_id;
        const response=await editEmailHelper(email,user_id)
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}


module.exports={
    getAllUsers,blockOrUnblockUser,
    checkIfUserBlockedOrNot,getUserDetailsForProfile,getUserWalletDetails,
    getWalletHistory,getAllUsersLength,getWalletHistoryLength,editUserName,
    editEmail
}