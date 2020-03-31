
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
    validateToken(req, res, next) {
        const token = req.headers['access-token']

        this.jwt.verify(token, this.secretToken, (err, data) => {
            if (err) {
                this.errorHandler.throwException('Login for user has expired!', 403)
            }
            else {
                req.user = data
                next()
            }
        })
    }
}

module.exports = JWT_service