const dbService = require('./DBService')
const bcryptServiceType = require('./bcryptService')
const errorHandler = require('../common/errorHandler')

module.exports = {
  Login: function (req, res, next) {
    const user = { userName: req.query.userName, password: req.query.password }
    dbService.GetPassword(user.userName, (error, password) => {
      if (error) {
        next(error)
      } else {
        if (bcryptServiceType.comparePassword(user.password, password)) {
          res.send(user)
        } else {
          errorHandler.throwException('Wrong username or password', 401)
        }
      }
    })
  },

  SignUp: function (req, res, next) {
    var user = {
      userName: req.query.userName,
      password: req.query.password,
      email: req.query.email
    }
    dbService.CheckIfUserExist(user.userName, (error, isExist) => {
      if (error) {
        next(error)
      } else {
        if (isExist) {
          errorHandler.throwException('user already exist!', 401)
        } else {
          user.password = bcryptServiceType.password(user)
          dbService.InsertUser(user, (error, result) => {
            if (error) {
              next(error)
            } else {
              res.send(result)
            }
          })
        }
      }
    })
  }
}
