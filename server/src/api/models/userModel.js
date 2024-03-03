const mongoose = require('mongoose'); // Erase if already required
const ObjectId=require('mongodb').ObjectId
const bcrypt=require('bcrypt')

const saltRounds = 10;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: amalks
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserLoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - role
 *      properties:
 *        email:
 *          type: string
 *          default: amalks@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *        role:
 *          type: string
 *          default: admin
 *    CreateUserLoginResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        token:
 *          type: string
 *        role:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     VerifyEmailInput:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           default: amalks@example.com
 *     VerifyEmailResponse:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         message:
 *           type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     VerifyOtpInput:
 *       type: object
 *       required:
 *         - otp
 *       properties:
 *         otp:
 *           type: string
 *           default: 87654
 *     VerifyOtpResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     VerifyPasswordInput:
 *       type: object
 *       required:
 *         - old-password
 *         - new-password
 *       properties:
 *         old-password:
 *           type: string
 *           default: 87654
 *         new-password:
 *           type: string
 *           default: Amalks123@
 *     VerifyPasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    EditUserInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - phone
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: amalks
 *        email:
 *          type: string
 *          default: amalks@example.com
 *        phone:
 *          type: number
 *          default: 9876543210
 *        password:
 *          type: string
 *          default: stringPassword123
 *    EditUserResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 */


/**
 * @openapi
 * components:
 *  schemas:
 *    GetAllUsersResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        role:
 *          type: string
 *        isBlocked:
 *          type: number
 *      
 */



// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
   
 
    username:{
        type:String,
        required:true,
        minLength: 3,
        maxLength: 50,
        pattern: /^[a-zA-Z ]+$/,
        lowercase:true,
        unique:true,
        message: 'Name must be at least 3 characters long and contain only letters and spaces',
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
        message: 'Invalid email address',
    },
    
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true,
        minLength: 8,
        maxLength: 128,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]{8,128}$/,
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
    isBlocked:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:"user"
    },
    refreshToken:{
        type:String,
        default:null
    },
  favorites:[{
    type:mongoose.ObjectId,
    ref:"Hotels"
}],

},
{
    timestamps:true
}
);

userSchema.pre('save',async function (next){
    this.password=await bcrypt.hash(this.password, saltRounds)
})



userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}



//Export the model
module.exports = mongoose.model('User', userSchema);