const container = require('../containerConfig')
const dbService = container.get('authenticationDB') // require('./DBService')
const bcryptServiceType = require('./bcryptService')
const errorHandler = require('../common/errorHandler')
const jwtService = require('../common/JWT_Service')
const socialApi = require('../social/posts/postsAPI')

module.exports = {
  Login: function (req, res, next) {
    const user = { userName: req.query.userName, password: req.query.password }
    dbService.GetPassword(user.userName, (error, data) => {
      if (error) {
        next(error)
      } else {
        if (bcryptServiceType.comparePassword(user.password, data.Password)) {
          const token = jwtService.createToken(data.ID)

          res.setHeader('access-token', token)
          res.send(user)
        } else {
          errorHandler.throwException('Wrong username or password', 400)
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
          errorHandler.throwException('user already exist!', 400)
        } else {
          user.password = bcryptServiceType.password(user)
          dbService.InsertUser(user, (error, data) => {
            if (error) {
              next(error)
            } else {
              data.createdUserId
              data.email = user.email
              data.userName = user.userName
              socialApi.createUser(data, (error, result) => {
                if (error) {
                  next(error)
                }
                else {
                  res.send(user)
                }
              })
            }
          })
        }
      }
    })
  }
}
