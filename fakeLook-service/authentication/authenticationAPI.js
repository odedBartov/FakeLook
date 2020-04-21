const bcryptServiceType = require('./bcryptService')

class authenticationAPI {
  currentController = "Authentication"
  authenticationAPI
  socialAPI
  errorHandler
  jwtService
  enviroment
  UUID
  logger
  constructor(AuthDAO, ErrorHandler, JWTservice, _enviroment, guidCreator, socialDAO, _logger) {
    this.authenticationAPI = AuthDAO
    this.socialAPI = socialDAO
    this.errorHandler = ErrorHandler
    this.jwtService = JWTservice
    this.enviroment = _enviroment
    this.UUID = guidCreator
    this.logger = _logger
  }

  Login(req, res, next) {
    const user = { userName: req.query.userName, password: req.query.password }
    this.logger.writeInfo(this.currentController, 'Login', `user logged in with username: ${user.userName}, and password: ${user.password}`)
    this.authenticationAPI.GetPassword(user.userName, (error, data) => {
      if (error) {
        this.logger.writeError(this.currentController, 'Login', error.message)
        next(error)
      } else {
        if (data && bcryptServiceType.comparePassword(user.password, data.Password)) {
          const token = this.jwtService.createToken(data.ID)
          res.setHeader('access-token', token)
          res.send(JSON.stringify({ userName: user.userName }))
        }
        else {
          this.logger.writeError(this.currentController, 'Login', 'wrong username or password!')
          next(this.errorHandler.createError('Wrong username or password', 400))
        }
      }
    })
  }



  SignUp(req, res, next) {
    const generatedID = this.UUID.v4()
    var user = {
      userName: req.query.userName,
      password: req.query.password,
      email: req.query.email,
      ID: generatedID
    }
    this.logger.writeInfo(this.currentController, 'SignUp', `user signed up with username: ${user.userName}, password: ${user.password} and email: ${user.email}`)
    this.authenticationAPI.CheckIfUserExist(user.userName, (error, isExist) => {
      if (error) {
        this.logger.writeError(this.currentController, 'SignUp', error.message)
        next(error)
      } else {
        if (isExist) {
          this.errorHandler.throwException('user already exist!', 400)
        } else {
          user.password = bcryptServiceType.password(user)
          this.authenticationAPI.InsertUser(user, (error, data) => {
            if (error) {
              this.logger.writeError(this.currentController, 'SignUp', error.message)
              next(error)
            } else {
              this.socialAPI.createUser(user, (error) => {
                if (error) {
                  this.logger.writeError(this.currentController, 'SignUp', error.message)
                  next(error)
                } else {
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


module.exports = authenticationAPI
