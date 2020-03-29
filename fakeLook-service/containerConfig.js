const container = require('kontainer-di')

const errorHandler = require('./common/errorHandler')
const JWTservice = require('./common/JWT_Service')
const strings = require('./common/strings')

const authenticationConfig = require('./dbConfig/authenticationConfig')
const authenticationDAO = require('./DAOs/authentication')
const authenticationAPI = require('./authentication/authenticationAPI')

const socialConfig = require('./dbConfig/socialConfig')
const postsDAO = require('./DAOs/posts')
const postsAPI = require('./social/posts/postsAPI')

container.register('errorHandler', [], errorHandler)
container.register('JWTservice', [], JWTservice)
container.register('currentUrl', [], strings.currentUrl)

container.register('socialConfig', [], socialConfig)
container.register('postsDB', ['socialConfig'], postsDAO)
container.register('postsAPI', ['postsDB', 'errorHandler', 'currentUrl'], postsAPI)

container.register('authenticationConfig', [], authenticationConfig)
container.register('authenticationDB', ['authenticationConfig'], authenticationDAO)
container.register('authenticationAPI', ['authenticationDB', 'errorHandler', 'JWTservice', 'postsAPI'], authenticationAPI)


module.exports = container