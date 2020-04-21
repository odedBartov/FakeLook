
class JWT_service {
    jwt
    errorHandler
    secretToken
    constructor(_enviroment, _errorHandler, _jwt) {
        this.secretToken = _enviroment.secretKey
        this.errorHandler = _errorHandler
        this.jwt = _jwt
    }

    createToken(id) {
        return this.jwt.sign({ id: id }, this.secretToken, { expiresIn: '4h' })
    }
    validateToken(req, callback) {
        const token = req.headers['access-token']

        this.jwt.verify(token, this.secretToken, (err, data) => {
            if (err) {
                callback(this.errorHandler.createError('Login for user has expired!', 403))
            }
            else {
                req.user = data
                callback(undefined)
            }
        })
    }
}

module.exports = JWT_service