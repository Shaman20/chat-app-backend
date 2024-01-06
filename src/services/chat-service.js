const Message = require("../models/chat-model");
const Friend = require("../models/friend-model");
const { Sequelize } = require("sequelize");

const viewMessage = async (senderId, recieverId) => {
  try {
    const message = await Message.findAll({
      where: {
        [Sequelize.Op.and]: [
          { senderId: senderId },
          { recieverId: recieverId }
        ],
      },
    });
    return message;
  } catch (error) {
    throw new Error("Error retrieving messages");
  }
};

module.exports = {
  viewMessage,
};
