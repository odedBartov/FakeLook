var container = require('kontainer-di')

var authenticationConfig = require('./dbConfig/authenticationConfig')
var authenticationDAO = require('./DAOs/authentication')

container.register('authenticationConfig', [], authenticationConfig)
container.register('authenticationDB', ['authenticationConfig'], authenticationDAO)

module.exports = container