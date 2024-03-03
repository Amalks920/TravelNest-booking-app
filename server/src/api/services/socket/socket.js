const { Server } =require("socket.io") ;
const http =require("http") ;
const express =require("express") ;
const Message=require('../../models/messageModel.js')
const Conversation=require('../../models/conversationModel.js')


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
	    cors:{
        origin:"http://localhost:5173",
        methods: ["GET", "POST"],
        //allowedOrigins
    }
	},
});

 const getRecipientSocketId = (recipientId) => {
	return userSocketMap[recipientId];
};

const userSocketMap = {}; // userId: socketId

io.on("connection", (socket) => {
	console.log("user connected", socket.id);
	const userId = socket.handshake.query.userId;

	if (userId != "undefined") userSocketMap[userId] = socket.id;
	console.log(userSocketMap)
	console.log('usersocketmap')
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
		try {
			console.log(conversationId,userId)
			await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
			await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
			io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
		} catch (error) {
			console.log(error);
		}
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

module.exports= { io, server, app,getRecipientSocketId };