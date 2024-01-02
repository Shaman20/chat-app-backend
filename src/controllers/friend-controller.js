const friendService = require("../services/friend-service");

const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user.id;

    const getUsers = friendService.viewFriends(loggedInUser);
    const filteredUsers = getUsers.filter((user) => user.id !== loggedInUser);

    res
      .status(200)
      .json({ message: "Users retrieved successfully", users: filteredUsers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

module.exports = {
    getUsers
}
