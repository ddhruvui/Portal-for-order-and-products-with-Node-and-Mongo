const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users.js')

router.post("/signup", UsersController.user_signup )


router.post("/login", UsersController.user_login )

module.exports = router