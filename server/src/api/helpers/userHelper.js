const userModel = require("../models/userModel");

const fetchAllUsersHelper = async (pageNumber) => {
  // return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await userModel
        .find({ role: { $ne: "admin" } }).sort({_id:-1}).skip((pageNumber-1)*4).limit(4)
        .select("username email phone isBlocked role timestamps");

      return allUsers
    } catch (error) {
      throw error
    }
  // });
};

const getAllUsersLengthHelper= async ()=>{
  try {
    const allUsers = await userModel
    .find({ role: { $ne: "admin" } })
    console.log(allUsers.length)
    return allUsers.length;
  } catch (error) {
    throw error
  }

}

const blockOrUnblockUserHelper = (user_id, isBlocked) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await userModel.updateOne(
        { _id: user_id },
        { isBlocked: isBlocked }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserBlockedOrNotHelper = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await userModel.findOne({ _id: user_id });
      if (response.isBlocked) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const findUserHelper = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userModel.findOne({ email: email });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

//useremail,
//username,
//userid
//userphone
const findUserByUserName =async (username) => {
  console.log(username,'is username unique')
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userModel.findOne(
        { username: username },
        {
          _id: 1,
          username: 1,
          email: 1,
          phone: 1,
        }
      );
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserDetailsForProfileHelper =async (user_id) => {
  return new Promise( async (resolve,reject)=>{
    try {
      const response=await userModel.findOne({_id:user_id})
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

const editUserNameHelper= async (user_id,userName) =>{
  try {

    const findIfUserNameAlredyExists=await userModel.findOne({username:userName})
    if(!findIfUserNameAlredyExists){
console.log(userName)
    const response=await userModel.updateOne(
      {_id:user_id},
      {
        $set:{
          username:userName
        }
      }
    )

    console.log(response)
    return response

  }else{
    throw 'username already exists'
  }

  } catch (error) {
    throw error
  }
}

const editEmailHelper= async (email,user_id) => {
  try {
    const response=await userModel.updateOne(
      {_id:user_id},
      {
        $set:{
          email:email
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  fetchAllUsersHelper,
  blockOrUnblockUserHelper,
  checkUserBlockedOrNotHelper,
  findUserHelper,
  findUserByUserName,
  getUserDetailsForProfileHelper,
  getAllUsersLengthHelper,
  editUserNameHelper,
  editEmailHelper
};
