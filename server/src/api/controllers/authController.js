const {
  signupHelper,
  loginHelper,
  changePasswordHelper,
  googleLoginHelper,
} = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const MailGen = require("mailgen");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { findUserHelper } = require("../helpers/userHelper");
const { createWalletHelper } = require("../helpers/walletHelper");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();

const registerNewUser = async (req, res, next) => {
  try {

    const response = await signupHelper(req.body);
    await createWalletHelper(response._id);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error.code)
    res.status(500).json({success:false, error: 'internal server error' });
  }
};

const login = async (req, res, next) => {
  try {
    const response = await loginHelper(req.body);
    const { foundUser, accessToken } = response;

    res.cookie("jwt", foundUser.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { _id, username, email, phone, isBlocked, role } = foundUser;

    const data = {
      user_id: _id,
      username,
      email,
      phone,
      isBlocked,
      role,
      accessToken,
    };

    res.status(200).json({ data });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ message: error.message });
  }
};

const googleSignIn = async (req, res) => {
  try {
    const { credential, clientId } = req.body.credentialResponse;
    const role=req.body.role;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];
    const email=payload.email


    const response=await googleLoginHelper(email,role);
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    const foundUser = await userModel.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.sendStatus(403); //Forbidden
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: "30d" }
        );

        const { username, email, phone, isBlocked, role } = foundUser;

        res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const verifyEmail = async (req, res, next) => {
  let email = req.body.email;
  try {
    const user = await findUserHelper(email);

    if (user) {
      userEmail = req.body.email;
      const EMAIL = process.env.MAILGEN_EMAIL;
      const PASSWORD = process.env.MAILGEN_PASSWORD;

      let config = {
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      };

      let transporter = nodemailer.createTransport(config);

      let MailGenerator = new MailGen({
        theme: "default",
        product: {
          name: "Mailgen",
          link: "https://mailgen.js/",
        },
      });

      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      });
      let response = {
        body: {
          Email: userEmail,
          intro: `Your OTP ${otp})}`,

          outro: "Expires within 10 minuites",
        },
      };

      let mail = MailGenerator.generate(response);

      let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Your OTP",
        html: mail,
      };

      transporter.sendMail(message).then(async () => {
        req.session.otp = otp;
        req.session.email = email;
        req.session.isUserOtpSend = true;
        console.log(req.session);

        res.status(200).json({ isOtpSend: true });
      });
    } else {
      //throw new Error('user not found')
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

const verifyEmailSignup = async (req, res, next) => {
  let email = req.body.email;
  try {
   
      userEmail = req.body.email;

      const DoesUserExist=await findUserHelper(userEmail)


      const EMAIL = process.env.MAILGEN_EMAIL;
      const PASSWORD = process.env.MAILGEN_PASSWORD;

      let config = {
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      };

      let transporter = nodemailer.createTransport(config);

      let MailGenerator = new MailGen({
        theme: "default",
        product: {
          name: "Mailgen",
          link: "https://mailgen.js/",
        },
      });

      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      });
      let response = {
        body: {
          Email: userEmail,
          intro: `Your OTP ${otp})}`,

          outro: "Expires within 10 minuites",
        },
      };

      let mail = MailGenerator.generate(response);

      let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Your OTP",
        html: mail,
      };

      transporter.sendMail(message).then(async () => {
        req.session.otp = otp;
        req.session.email = email;
        req.session.isUserOtpSend = true;
        console.log(req.session);

        res.status(200).json({ isOtpSend: true });
      });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
};

const verifyOtp = async (req, res, next) => {
  let otp = req.body.otp;
  let email = req.body.email;
  console.log(req.body);
  console.log(req.session.email);
  console.log(req.session.otp);
  console.log(otp);
  console.log(email);
  try {
    console.log(email, otp);
    if (req.session.otp == otp && req.session.email == email) {
       await userModel.updateOne(
        {email:email},
        {
          $set:{
            isBlocked:false
          }
        }
        )
      res.status(200).json(true);
    } else {
      res.status(404).json({ msg: "incorrect otp" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

const changePassword = async (req, res, next) => {
  console.log("entereeed");
  console.log(req.body);
  try {
    let { email, password } = req.body;
    const response = await changePasswordHelper(email, password);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error });
  }
};

module.exports = {
  registerNewUser,
  login,
  handleRefreshToken,
  verifyEmail,
  changePassword,
  verifyOtp,
  googleSignIn,
  verifyEmailSignup
};
