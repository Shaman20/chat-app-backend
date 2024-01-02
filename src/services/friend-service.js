const Friend = require("../models/friend-model");
const User = require("../models/user-model");
const { Sequelize, where } = require("sequelize");

const viewFriends = async (loggedInUser) => {
  try {
    const users = await User.findAll({
        where: {
            id: {
                [Sequelize.Op.not]: loggedInUser
            }
        }
    });
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  viewFriends,
};
