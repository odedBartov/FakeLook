const express = require('express')
const authAPI = require('./authAPI')

const router = express.Router();

router.get('/login', authAPI.Login)

router.get('/signup', authAPI.SignUp)

module.exports = router