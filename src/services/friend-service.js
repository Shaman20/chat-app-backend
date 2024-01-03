const Friend = require("../models/friend-model");
const User = require("../models/user-model");
const { Sequelize, where, Op } = require("sequelize");

const viewUsers = async (loggedInUser) => {
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.not]: loggedInUser,
        },
      },
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const sendFriendRequest = async (userId, friendId) => {
  try {
    const sentRequest = await Friend.findOne({
      where: {
        userId,
        friendId,
      },
    });
    if (sentRequest) {
      throw new Error("Request Already sent!");
    } else {
      const sendRequest = await Friend.create({
        userId: userId,
        friendId: friendId,
        status: 0,
      });

      return sendRequest;
    }
  } catch (error) {
    throw new Error("Failed to send friend request");
  }
};

const acceptFriendRequest = async (userId, friendId) => {
  try {
    const acceptRequest = await Friend.findOne({
      where: {
        userId,
        friendId,
        status: 0,
      },
    });
    if (acceptRequest) {
      await acceptRequest.update({
        status: 1,
      });
      return acceptRequest;
    } else {
      throw new Error("Ignored request");
    }
  } catch (error) {
    throw new Error("Did not accept the request");
  }
};

const viewFriends = async (userId) => {
  try {
    const getFriends = await Friend.findAll({
      where: {
        [Op.or]: [
          { userId: userId, status: 1 },
          { friendId: userId, status: 1 },
        ],
      },
    });
    return getFriends;
  } catch (error) {
    throw new Error("Failed to retrieve friends");
  }
};

module.exports = {
  viewUsers,
  sendFriendRequest,
  acceptFriendRequest,
  viewFriends,
};
