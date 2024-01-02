const express = require("express");
const router = express.Router();
const userRoute = require("./user-route");
const friendRoute = require('./friend-route')

router.use("/users", userRoute);
router.use("friends", friendRoute)

module.exports = router;
