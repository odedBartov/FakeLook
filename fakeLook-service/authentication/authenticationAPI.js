const bcryptServiceType = require('./bcryptService')

class authenticationAPI {
  authenticationAPI
  socialAPI
  errorHandler
  jwtService
  enviroment
  UUID
  constructor(AuthDAO, ErrorHandler, JWTservice, _enviroment, guidCreator, socialDAO) {
    this.authenticationAPI = AuthDAO
    this.socialAPI = socialDAO
    this.errorHandler = ErrorHandler
    this.jwtService = JWTservice
    this.enviroment = _enviroment
    this.UUID = guidCreator
  }

  Login(req, res, next) {
    const user = { userName: req.query.userName, password: req.query.password }
    this.authenticationAPI.GetPassword(user.userName, (error, data) => {
      if (error) {
        next(error)
      } else {
          if (data && bcryptServiceType.comparePassword(user.password, data.Password)) {
            const token = this.jwtService.createToken(data.ID)
            res.setHeader('access-token', token)
            res.send(JSON.stringify({ userName: user.userName }))
          }
        else {
          this.errorHandler.throwException('Wrong username or password', 400)
        }
      }
    })
 /*    const user = { userName: req.query.userName, password: req.query.password }
    if (error) {
      next(error)
    } else {
      if (bcryptServiceType.comparePassword(user.password, data.Password)) {
        const token = this.jwtService.createToken(data.ID)
        res.setHeader('access-token', token)
        res.send(JSON.stringify({ userName: user.userName }))
      } else {
        this.errorHandler.throwException('Wrong username or password', 400)
      }
    } */
  }



  SignUp(req, res, next) {
    const generatedID = this.UUID.v4()
    var user = {
      userName: req.query.userName,
      password: req.query.password,
      email: req.query.email,
      ID: generatedID
    }
    this.authenticationAPI.CheckIfUserExist(user.userName, (error, isExist) => {
      if (error) {
        next(error)
      } else {
        if (isExist) {
          this.errorHandler.throwException('user already exist!', 400)
        } else {
          user.password = bcryptServiceType.password(user)
          this.authenticationAPI.InsertUser(user, (error, data) => {
            if (error) {
              next(error)
            } else {
              this.socialAPI.createUser(user, (error) => {
                if (error) {
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
