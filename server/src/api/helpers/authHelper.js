const { resolve } = require("path");
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');
const { findOne } = require("../models/hotelModel");
require('dotenv').config();

const signupHelper = async function (data) {
    // return new Promise(async (resolve, reject) => {
        try {
            const response = await userModel.create(data)
            return response
        } catch (error) {
            throw error
        }
    // })
}

const loginHelper = async  function ({ email, password, role }) {
    // return new Promise(async (resolve, reject) => {
        try {

            const foundUser = await userModel.findOne({ email: email, role: role })

            if (!foundUser)   throw Error('user not found')

            if (foundUser.isBlocked === true) throw Error('user is blocked')
            console.log(foundUser)
            if (await foundUser.isPasswordMatched(password)) {

                const accessToken = jwt.sign(
                    { 'username': foundUser.username },
                    process.env.ACCESS_TOKEN_PRIVATE_KEY,
                    { expiresIn: '30d' }
                )

                const refreshToken = jwt.sign(
                    { "username": foundUser.username },
                    process.env.REFRESH_TOKEN_PRIVATE_KEY,
                    { expiresIn: '1d' }
                )

                await userModel.updateOne(
                    { email: email },
                    { $set: { refreshToken: refreshToken } }
                )
                return { foundUser, accessToken }
            }else{
                throw Error('password is incorrect')
            }


        } catch (error) {
           throw error
        }
    // })
}

const googleLoginHelper = async function ( email,role ) {

    // return new Promise(async (resolve, reject) => {
        try {

            const foundUser = await userModel.findOne({ email: email, role: role })

            if (!foundUser) return reject('user not found')

            if (foundUser.isBlocked === true) throw ('user is blocked')
            console.log(foundUser)
            // if (await foundUser.isPasswordMatched(password)) {

                const accessToken = jwt.sign(
                    { 'username': foundUser.username },
                    process.env.ACCESS_TOKEN_PRIVATE_KEY,
                    { expiresIn: '30d' }
                )

                const refreshToken = jwt.sign(
                    { "username": foundUser.username },
                    process.env.REFRESH_TOKEN_PRIVATE_KEY,
                    { expiresIn: '1d' }
                )

                await userModel.updateOne(
                    { email: email },
                    { $set: { refreshToken: refreshToken } }
                )
                return { foundUser, accessToken }
            // }else{
            //     return reject('password is incorrect')
            // }


        } catch (error) {

            throw error
        }
    // })
}





const changePasswordHelper= function (email,password){
    return new Promise(async (resolve,reject)=>{
        try {
  
            const findUser=await userModel.findOne({email:email})
            findUser.password=password;
            findUser.save()
           resolve(true)

        } catch (error) {
            reject(error.message)
        }
    })
}


// const authHelper=()=>{
//     return new Promise((resolve,reject)=>{
//         try {
            
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

module.exports = {
    signupHelper, loginHelper,
    changePasswordHelper,googleLoginHelper
}