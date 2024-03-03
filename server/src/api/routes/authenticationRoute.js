const express = require('express');
const router = express.Router();
const validateResource = require('../middlewares/validateResource')
const userModel = require('../models/userModel');
const { registerNewUser, login, handleRefreshToken, verifyEmail, verifyOtp, changePassword, googleSignIn, verifyEmailSignup } = require('../controllers/authController');
const { signUpValidation, loginValidation } = require('../utils/validations');
const handleError = require('../middlewares/errorHandler');
const { changePasswordHelper } = require('../helpers/authHelper');


  /**
   * @openapi
   * '/api/auth/signup':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

router.post('/signup',signUpValidation,handleError, registerNewUser)

  /**
   * @openapi
   * '/api/auth/login':
   *  post:
   *     tags:
   *     - Auth
   *     summary: user login
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserLoginInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserLoginResponse'
   *      402:
   *        description: password or email incorrect
   *      400:
   *        description: Bad request
   */

  router.post('/login',loginValidation,handleError,login)
  router.post('/google-signin',googleSignIn)

  /**
   * @openapi
   * '/api/auth/refresh':
   *  get:
   *     tags:
   *     - Auth
   *     summary: refresh token
   *     responses:
   *      200:
   *        description: Success
   *      402:
   *        description: password or email incorrect
   *      400:
   *        description: Bad request
   */

  router.get('/refresh',handleRefreshToken)

  /**
   * @openapi
   * '/api/auth/verify-email-or-phone':
   *  post:
   *     tags:
   *     - Auth
   *     summary: verify email or password
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/VerifyEmailInput'
   *     responses:
   *      200:
   *        description: Otp Send
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/VerifyEmailResponse'
   *      402:
   *        description: email/phone incorrect
   *      400:
   *        description: Bad request
   */

router.post('/verify-email',verifyEmail)


router.post('/verify-email-signup',verifyEmailSignup)

  /**
   * @openapi
   * '/api/auth/verify-otp':
   *  post:
   *     tags:
   *     - Auth
   *     summary: verify email or password
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/VerifyOtpInput'
   *     responses:
   *      200:
   *        description: Otp Send
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/VerifyOtpResponse'
   *      402:
   *        description: Otp incorrect
   *      400:
   *        description: Bad request
   */

  router.post('/verify-otp', verifyOtp)

 /**
   * @openapi
   * '/api/auth/change-password':
   *  put:
   *     tags:
   *     - Auth
   *     summary: change password
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/VerifyPasswordInput'
   *     responses:
   *      200:
   *        description: Password changed successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/VerifyPasswordResponse'
   *      402:
   *        description: password failed to change
   *      400:
   *        description: Bad request
   */

// router.put('/change-password', (req, res) => {
//     res.status(201).json({ message: 'password changeed successfully' });
// })



router.post('/change-password',changePassword)

module.exports = router;