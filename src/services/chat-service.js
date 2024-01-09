const Message = require("../models/chat-model");
const sequelize = require("../models/db");
const Friend = require("../models/friend-model");
const { QueryTypes } = require("sequelize");

const viewMessage = async (loggedInUser) => {
  try {
    const message = await sequelize.query(
      "SELECT content FROM `messages` WHERE senderId = :loggedInUser",
      {
        type: QueryTypes.SELECT,
        replacements: { loggedInUser },
      }
    );
    return message;
  } catch (error) {
    console.log("Error in message service", error);
    throw new Error("Error retrieving messages");
  }
};

const sendMessage = async (senderId, recieverId, content) => {
  try {
    const send = await Message.create({
      senderId: senderId,
      recieverId: recieverId,
      content: content,
    });
    return send;
  } catch (err) {
    console.log("Error in chat service", err);
    throw err;
  }
};

module.exports = {
  viewMessage,
  sendMessage
};
