const { chatHelper } = require('../helpers/chatHelper');
const Conversation=require('../models/conversationModel');
const Message=require('../models/messageModel')

const {getRecipientSocketId,io}=require('../services/socket/socket')


async function sendMessage(req, res) {
	try {
		const { recipientId, message,senderId } = req.body;
		console.log(req.body)
		console.log('req.body')
		// let { img } = req.body;
		//const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, recipientId] },
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderId, recipientId],
				lastMessage: {
					text: message,
					sender: senderId,
				},
			});
			await conversation.save();
		}

		// if (img) {
		// 	const uploadedResponse = await cloudinary.uploader.upload(img);
		// 	img = uploadedResponse.secure_url;
		// }

		const newMessage = new Message({
			conversationId: conversation._id,
			sender: senderId,
			text: message,
			img:  "",
		});

		await Promise.all([
			newMessage.save(),
			conversation.updateOne({
				lastMessage: {
					text: message,
					sender: senderId,
				},
			}),
		]);

		const recipientSocketId = getRecipientSocketId(recipientId);
		if (recipientSocketId) {
			io.to(recipientSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
        console.log(error)
		res.status(500).json({ error: error.message });
	}
}

async function getMessages(req, res) {
	const { otherUserId,userId } = req.params;
	console.log(otherUserId,userId)
	try {

		const conversation = await Conversation.findOne({
			participants: { $all: [userId, otherUserId] },
		});

		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		const messages = await Message.find({
			conversationId: conversation._id,
		}).sort({ createdAt: 1 }).populate({path:'sender'});

		res.status(200).json(messages);
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: error.message });
	}
}

async function getConversations(req, res) {
	const userId = req.params.user_id;
	try {
		const conversations = await Conversation.find({ participants: userId }).populate({
			path: "participants",
			select: "username profilePic",
		});

		// remove the current user from the participants array
		conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
		res.status(200).json(conversations);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

const getUsersChat=async (req,res)=>{

	const owner_id=req?.params?.owner_id;

	try {
	const response=	await chatHelper(owner_id)
	res.status(200).json({response});
	} catch (error) {
		console.log(error)
		res.status(404).json({error})
	}
}

module.exports= { sendMessage, getMessages, getConversations, getUsersChat };