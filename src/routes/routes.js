const express = require("express");
const router = express.Router();
const userRoute = require("./user-route");
const friendRoute = require("./friend-route");
const chatRoute = require("./chat-route");

router.use("/users", userRoute);
router.use("/friends", friendRoute);
router.use("/chat", chatRoute);
module.exports = router;
