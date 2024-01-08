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

module.exports = {
  viewMessage,
};
