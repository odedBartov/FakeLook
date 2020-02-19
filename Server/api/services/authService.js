const jwt = require('jsonwebtoken');
const secretToken = process.env.Secret_Token;

module.exports = {

    CreateValidationToken: (item) => {
        return jwt.sign(item, secretToken);
    },
    CheckValidationToken: (token) => {
        return jwt.verify(token, secretToken);
    },

    ValidateTokenMiddleware: (req, res, next) => {
        let response = { message: 'access denied', result: false };
        /*      let token = req.header('authentication-token'); */
        let token = req.body.token;
        if (token) {
            req.userToken = jwt.verify(token, secretToken);
            next();
        }
        else {
            res.status(401).json(response);
        }
    }

}