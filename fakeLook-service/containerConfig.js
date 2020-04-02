const container = require('kontainer-di')

const errorHandler = require('./common/errorHandler')
const JWTservice = require('./common/JWT_Service')
const strings = require('./common/strings')
const elasticsearch  = require('elasticsearch')
const elasticClient = new elasticsearch.Client({ node: 'http://localhost:5601' })
const { v4: uuidv4 } = require('uuid')
const enviroment = require('./enviroments/dev')
const jwt = require('jsonwebtoken')
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

container.register('socialConfig', [], socialConfig)
container.register('postsDB', ['socialConfig', 'elasticClient', 'uuid'], postsDAO)
container.register('postsAPI', ['postsDB', 'errorHandler', 'currentUrl', 'enviroment'], postsAPI)

container.register('authenticationDB', ['authenticationConfig', 'uuid'], authenticationDAO)
container.register('authenticationAPI', ['authenticationDB', 'errorHandler', 'JWTservice', 'enviroment'], authenticationAPI)


module.exports = container