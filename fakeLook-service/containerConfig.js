const container = require('kontainer-di')

const elasticsearch  = require('elasticsearch')
const elasticClient = new elasticsearch.Client({ node: 'http://localhost:5601' })
const { v4: uuidv4 } = require('uuid')
const enviroment = require('./enviroments/dev')
const jwt = require('jsonwebtoken')
const errorHandler = require('./common/errorHandler')
const JWTservice = require('./common/JWT_Service')
const strings = require('./common/strings')
const logger = require('./common/logger')

const authenticationConfig = require('./dbConfig/authenticationConfig')
const authenticationDAO = require('./DAOs/authentication')
const authenticationAPI = require('./authentication/authenticationAPI')

const socialConfig = require('./dbConfig/socialConfig')
const postsDAO = require('./DAOs/posts')
const postsAPI = require('./social/posts/postsAPI')

container.register('authenticationConfig', [], authenticationConfig)
container.register('enviroment', [], enviroment)
container.register('errorHandler', [], errorHandler)
container.register('jwt', [], jwt)
container.register('JWTservice', ['enviroment', 'errorHandler', 'jwt'], JWTservice)
container.register('currentUrl', [], strings.currentUrl)
container.register('elasticClient', [], elasticClient)
container.register('uuid', [], { v4: uuidv4 })
container.register('logger', [], logger)

container.register('socialConfig', [], socialConfig)
container.register('postsDB', ['elasticClient', 'uuid', 'logger'], postsDAO)
container.register('postsAPI', ['postsDB', 'errorHandler', 'currentUrl', 'enviroment', 'logger'], postsAPI)

container.register('authenticationDB', ['authenticationConfig', 'uuid'], authenticationDAO)
container.register('authenticationAPI', ['authenticationDB', 'errorHandler', 'JWTservice', 'enviroment', 'uuid', 'postsAPI', 'logger'], authenticationAPI)


module.exports = container