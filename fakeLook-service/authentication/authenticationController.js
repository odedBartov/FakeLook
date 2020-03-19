const express = require('express')
const container = require('../containerConfig')
const authAPI = container.get('authenticationAPI')

const router = express.Router();

router.get('/login', (req, res, next) => {
    authAPI.Login(req, res, next)
})

router.get('/signup', (req, res, next) => {
    authAPI.SignUp(req, res, next)
})

module.exports = router