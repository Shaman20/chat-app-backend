const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const friendController = require("../controllers/friend-controller");

router.get("/view", verifyToken, friendController.getUsers);
router.post("/send-request", verifyToken, friendController.requestFriendship);
router.post("/accept-request", verifyToken, friendController.acceptFriendship);
router.get("/friends", verifyToken, friendController.myFriends);
module.exports = router;
