const friendService = require("../services/friend-service");

const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const getUsers = await friendService.viewUsers(loggedInUser);
    res
      .status(200)
      .json({ message: "Users retrieved successfully", users: getUsers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

const requestFriendship = async (req, res) => {
  try {
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(201).json({ msg: "No such friend exists" });
    }

    const userId = req.user.id;

    const friendship = await friendService.sendFriendRequest(userId, friendId);

    return res.status(201).json({ msg: "You are friends", friendship });
  } catch (error) {
    return res.status(500).json({ msg: "Failed creating friendship", error });
  }
};

const acceptFriendship = async (req, res) => {
  try {
    const friendId = req.body.friendId;
    if (!friendId) {
      return res.status(400).json({ msg: "FriendId is required" });
    }

    const userId = req.user.id;

    const friendship = await friendService.acceptFriendRequest(
      userId,
      friendId
    );

    return res
      .status(200)
      .json({ msg: "Friend request accepted successfully", friendship });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed accepting friend request", error: error.message });
  }
};

const myFriends = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const friendList = await friendService.viewFriends(loggedInUser);
    return res.status(201).json({
      msg: "My Friends",
      result: friendList,
    });
  } catch (error) {
    return res.status(501).json({
      msg: "Error returning friends",
      result: error,
    });
  }
};

module.exports = {
  getUsers,
  requestFriendship,
  acceptFriendship,
  myFriends,
};
