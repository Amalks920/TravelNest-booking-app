const conversationModel=require('../models/conversationModel')

const chatHelper=(owner_id)=>{
  
    return new Promise(async (resolve,reject)=>{
        try {
        const response=await conversationModel.find({
            participants:{$in: [owner_id]}
        })
        resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}


module.exports={
    chatHelper
}