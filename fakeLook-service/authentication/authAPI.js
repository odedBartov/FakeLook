const dbService = require('./DBService')
const bcryptServiceType = require('./bcryptService')
//const bcryptService = new bcryptServiceType();


module.exports = {
    Login: function (req, res, next) {
        const user = { userName: req.query.userName, password: req.query.password }
        dbService.GetPassword(user.userName, (error, password) => {
            if (error) {
                next(error)
            }
            else {
                if (bcryptServiceType().comparePassword(user.password, password)) {
                    res.send(user)
                }
                else {
                    const err = new Error();
                    err.message = "Wrong username or password"
                    err.status = 401
                    next(err)
                }
            }
        })
    },

    SignUp: function (req, res, next) {
        var user = { userName: req.query.userName, password: req.query.password, email: req.query.email } 
        dbService.CheckIfUserExist(user.userName, (error, isExist) => {
            if (error) {
                next(error)
            }
            else {
                if (isExist) {
                    const err = new Error();
                    err.message = "user already exist!"
                    err.status = 401
                    next(err)
                }
                else {
                    console.log(user);
                    user.password = bcryptServiceType().password(user)
                    dbService.InsertUser(user, (error, result) => {
                        if (error) {
                            next(error)
                        }
                        else {
                            res.send(result)
                        }
                    })
                }
            }
        })
    }
};
