const { addCouponHelper, getAllCouponsOwnerHelper, getAllCoupnsOwnerLengthHelper, getAllCouponsUserHelper, deListCouponHelper, getACouponHelper, editCouponHelper } = require("../helpers/couponHelper")


const addCoupon = async (req,res) => {
    try {
        const data=req.body
        console.log(data)
      
        const response = await addCouponHelper(data)
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

const getAllCouponsOwner= async (req,res) => {
try {
   const response=await getAllCouponsOwnerHelper()
   res.status(200).json({response})
} catch (error) {
    res.status(500).json({error})
}
}

const getAllCoupnsOwnerLength= async (req,res) => {
    try {
    
        const response=await getAllCoupnsOwnerLengthHelper()
        console.log(response)
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const deListCoupon = async (req,res) => {
    const id=req.params.id
    const status=req.body.status
    try {
      const response=await deListCouponHelper(id,status)  
      res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

const getAllCouponsUser = async (req,res)=>{
    try {
     const response=await getAllCouponsUserHelper()
     res.status(200).json({response})
    } catch (error) {
       res.status(500).json({error}) 
    }
}

const getACouponController = async (req,res) => {
    const coupon_id=req.params.coupon_id;

    try {
        const response=await getACouponHelper(coupon_id)
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const editCoupon = async (req,res) =>{
    const data=req.body
    try {
        const response= await editCouponHelper(data)  
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports={
    addCoupon,getAllCouponsOwner,
    getAllCoupnsOwnerLength,getAllCouponsUser,
    deListCoupon,getACouponController,editCoupon
}

