const bcryptServiceType = require('./bcryptService')

class authenticationAPI {
  dbService
  errorHandler
  jwtService
  constructor(AuthDAO, ErrorHandler, JWTservice) {    
    this.dbService = AuthDAO
    this.errorHandler = ErrorHandler
    this.jwtService = JWTservice
  }

  Login(req, res, next) {
    const user = { userName: req.query.userName, password: req.query.password }
    this.dbService.GetPassword(user.userName, (error, data) => {
      if (error) {        
        next(error)
      } else {
        if (bcryptServiceType.comparePassword(user.password, data.password)) {
          const token = this.jwtService.createToken(data.user_id)

          res.setHeader('access-token', token)
          res.send(user)
        } else {
          this.errorHandler.throwException('Wrong username or password', 400)
        }
      }
    })
  }

  SignUp(req, res, next) {
    var user = {
      userName: req.query.userName,
      password: req.query.password,
      email: req.query.email
    }
    this.dbService.CheckIfUserExist(user.userName, (error, isExist) => {
      if (error) {
        next(error)
      } else {
        if (isExist) {
          this.errorHandler.throwException('user already exist!', 400)
        } else {
          user.password = bcryptServiceType.password(user)
          this.dbService.InsertUser(user, (error, data) => {
            if (error) {
              next(error)
            } else {
              res.send(user)
            }
          })
        }
      }
    })
  }
}

module.exports = authenticationAPI