const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const chatController = require("../controllers/chat-controller");

router.get("/view", verifyToken, chatController.getMessages);

module.exports = router;
