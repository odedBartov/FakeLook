const jwt = require('jsonwebtoken')
const errorHandler = require('./errorHandler')
const enviroment = require('../enviroments/dev')
const secretToken = enviroment.secretKey

module.exports = {
    createToken: (id) => {        
        return jwt.sign({ id: id }, secretToken, { expiresIn: '1h' })
    },
    validateToken: (req, res, next) => {
        const token = req.headers['access-token']

        jwt.verify(token, secretToken, (err, data) => {
            if (err) {
                errorHandler.throwException('Login for user has expired!', 403)
            }
            else {
                req.user = data
                next()
            }
        })
    }
}