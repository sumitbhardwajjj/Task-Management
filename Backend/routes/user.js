const express = require('express')
const UserController = require("../controller/user.js")


const router = express.Router()

router
.post('/',UserController.Signup)
.post('/login',UserController.Login)

exports.router = router