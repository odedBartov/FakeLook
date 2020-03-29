const container = require('kontainer-di')

const errorHandler = require('./common/errorHandler')
const JWTservice = require('./common/JWT_Service')
const strings = require('./common/strings')
const elasticsearch  = require('elasticsearch')
const elasticClient = new elasticsearch.Client({ node: 'http://localhost:5601' })
const { v4: uuidv4 } = require('uuid')

const authenticationDAO = require('./DAOs/authentication')
const authenticationAPI = require('./authentication/authenticationAPI')

const socialConfig = require('./dbConfig/socialConfig')
const postsDAO = require('./DAOs/posts')
const postsAPI = require('./social/posts/postsAPI')

container.register('errorHandler', [], errorHandler)
container.register('JWTservice', [], JWTservice)
container.register('currentUrl', [], strings.currentUrl)
container.register('elasticClient', [], elasticClient)
container.register('uuid', [], { v4: uuidv4 })

container.register('socialConfig', [], socialConfig)
container.register('postsDB', ['socialConfig', 'elasticClient', 'uuid'], postsDAO)
container.register('postsAPI', ['postsDB', 'errorHandler', 'currentUrl'], postsAPI)

container.register('authenticationDB', ['elasticClient', 'uuid'], authenticationDAO)
container.register('authenticationAPI', ['authenticationDB', 'errorHandler', 'JWTservice'], authenticationAPI)


module.exports = container