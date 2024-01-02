const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const friendController = require('../controllers/friend-controller')

router.get('/view', verifyToken, friendController.getUsers)

module.exports = router
