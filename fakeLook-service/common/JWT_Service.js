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
    validateToken(recievedToken, callback) {
        this.jwt.verify(recievedToken, this.secretToken, (err, data) => {
            if (err) {
                callback(this.errorHandler.createError('Login for user has expired!', 403), undefined)
            }
            else {
                callback(undefined, data)
            }
        })
    }
}

module.exports = JWT_service