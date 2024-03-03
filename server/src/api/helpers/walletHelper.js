const walletModel = require("../models/walletModel");
const { Wallet, WalletHistory } = require("../models/walletModel");
const mongoose=require('mongoose')

const createWalletHelper = async (user_id) => {
 
    try {
      const response = await Wallet.create({ user_id: user_id });
      return response
    } catch (error) {
      throw new Error('something went wrong')
    }

};

const addToWalletHelper = (user_id, amount) => {
  console.log(user_id, amount);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await walletModel.updateOne(
        { user_id },
        {
          $inc: {
            amount: amount,
          },
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const userWalletDetailsHelper = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Wallet.findOne({ user_id: user_id });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const updateWalletAmountHelper = async (data) => {
  console.log(data)
  console.log('data data data data')
  const { user_id, amount,type } = data;
  try {
    const response = await Wallet.findOneAndUpdate(
      { user_id: user_id },
      { $inc: { amount: amount } },
      { new: true }
    );

    await updateWalletHistoryHelper({_id:response._id,amount,type:type});

    return response;
  } catch (error) {
    return error;
  }
};

const updateWalletHistoryHelper = async ({_id,amount,type}) => {
    console.log(_id,amount,type)
  try {
    const historyEntry=new WalletHistory({
        wallet_id:_id,
        transaction_type:type,
        amount:amount
    });

    await historyEntry.save();
    console.log(historyEntry)
    console.log('history entry')
  } catch (error) {
    console.log(error)
    return error;
  }
};

const getWalletHistoryHelper=async (wallet_id,pageNumber)=>{
    try {
      const response = await WalletHistory.aggregate([
        {
          $match: {
            wallet_id:new mongoose.Types.ObjectId(wallet_id)
          }
        },
        {
          $sort: { _id: -1 } // Assuming _id field is used for sorting, replace it with your relevant field
        },
        {
          $skip: (pageNumber-1) * 7
        },
        {
          $limit:7
        }
      ]);
      
       
       //find({wallet_id:wallet_id}).skip(pageNumber*4).limit(4)
       return response
    } catch (error) {
        return error
    }
}

const getWalletHistoryLengthHelper=async (wallet_id)=>{
  try {
    const response=await WalletHistory.find({wallet_id:wallet_id})
    return response.length;
  } catch (error) {
    return error
  }
}

const getWalletAmountHelper=async (user_id)=>{
  try {
    console.log('ressponse')
    const response=await Wallet.find({user_id});
    console.log(response);
    return response
  } catch (error) {
     throw  error
  }
}

module.exports = {
  createWalletHelper,
  addToWalletHelper,
  userWalletDetailsHelper,
  updateWalletAmountHelper,
  updateWalletHistoryHelper,
  getWalletHistoryHelper,
  getWalletAmountHelper,
  getWalletHistoryLengthHelper
};
