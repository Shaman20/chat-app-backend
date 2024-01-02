const friendService = require("../services/friend-service");

const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user.id
    const getUsers = await friendService.viewFriends(loggedInUser);
    res
      .status(200)
      .json({ message: "Users retrieved successfully", users: getUsers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

module.exports = {
    getUsers
}
