const Friend = require("../models/friend-model");
const User = require("../models/user-model");
const { Sequelize } = require("sequelize");

const viewFriends = async (excludeUserId) => {
  try {
    const users = User.findAll({
      where: {
        id: {
          [Sequelize.Op.not]: excludeUserId,
        },
      },
    });
    return users
  } catch (error) {
    throw error;
  }
};


module.exports = {
    viewFriends
}
