const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateMessageResponse:
 *      type: object
 *      required:
 *        - userId
 *        - message
 *        - chat
 *      properties:
 *        userId:
 *          type: number
 *          default: 49384848848
 *        message:
 *          type: string
 *          default: hello amal
 *        chat:
 *          type: number
 *          default: 4938484884842988
 */

const messageModel = mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    seen: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageModel);
