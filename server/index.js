 const express=require('express')
// const app=express()
const morgan=require('morgan')
const session = require('express-session');
const swaggerDocs=require('./utils/swagger')
const dbConnect = require('./src/config/dbConfig')
const routes=require('./routes')
const cors=require('cors')
const http=require('http')
const cookieParser=require('cookie-parser')
const socketEvents=require('./src/api/services/socket/socket.js');
//const redisClient=require('./src/config/redisConfig.js')
const credentials=require('./src/api/middlewares/credentials')
const corsOptions=require('./src/config/cors/corsOption')
const authRouter=require('./src/api/routes/authenticationRoute')
const userRouter=require('./src/api/routes/userRoute')
const hotelRouter=require('./src/api/routes/hotelRoute')
const bookingRouter=require('./src/api/routes/bookingRoute')
const roomRouter=require('./src/api/routes/roomRoute')
const reviewRouter=require('./src/api/routes/reviewRoute')
const couponRouter=require('./src/api/routes/couponRoute')
const salesRouter=require('./src/api/routes/salesRoute')
const chatRouter=require('./src/api/routes/chatRoute.js')
const paymentRouter=require('./src/api/routes/paymentRoute')
const searchRouter=require('./src/api/routes/searchRoute')
const walletRouter=require('./src/api/routes/walletRoute.js')
//const { Server } = require('socket.io');
const { app, server } =require( "./src/api/services/socket/socket.js");

//const server=http.createServer(app)

const handleError = require('./src/api/middlewares/errorHandler');
const allowedOrigins = require('./src/config/cors/allowedOrigins');


// const  io= new Server(server,{
//     cors:{
//         origin:"http://localhost:5173",
//         methods: ["GET", "POST"],
//         //allowedOrigins
//     }
// })

//console.log(redisClient)

// socketEvents(io)

app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(credentials);
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(session({ secret: "Private", resave: true, saveUninitialized: true}))


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/hotel',hotelRouter)
app.use('/api/booking',bookingRouter)
app.use('/api/room',roomRouter)
app.use('/api/review',reviewRouter)
app.use('/api/coupon',couponRouter)
app.use('/api/sales',salesRouter)
app.use('/api/chat',chatRouter)
app.use('/api/payment',paymentRouter)
app.use('/api/search',searchRouter)
app.use('/api/wallet',walletRouter)
app.use('/api/coupon',couponRouter)

server.listen(4000,async ()=>{
    console.log('server running')
     dbConnect()
      routes(app)
     swaggerDocs(app,5000)
})


