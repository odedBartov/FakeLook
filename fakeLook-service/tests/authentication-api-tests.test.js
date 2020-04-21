const assert = require('chai').assert
const container = require('./containerConfigForTests')
const bcryptService = require('../common/bcryptService')

describe("the tests for authentication API", () => {
    const authenticationAPI = container.get('authenticationAPI')
    const fakeDB = container.get('UsersDB')
    const UUID = container.get('uuid')

    it("should login with existing user", () => {
        const someUserName = "oded"
        const somePassword = "12"

        const user = { userName: someUserName, Password: bcryptService.createPassword(somePassword), id: UUID.v4() }
        fakeDB.createUser(user)

        const request = { query: { userName: someUserName, password: somePassword } }
        const response = {
            send: (data) => {
                assert.equal(user.userName, JSON.parse(data).userName)
            },
            setHeader: (header, token) => {
                //nothing to do
            }
        }
        const next = (error) => {
            throw error
        }

        authenticationAPI.Login(request, response, next)
    })

    it("should create new user", () => {
        const userName = "amir"
        const email = "amir@mail.com"
        const request = { query: { userName: userName, password: "12", email: email } }
        const response = {
            send: (data) => {
                assert.equal(data.userName, userName)
                assert.equal(data.email, email)
            }
        }
        const next = (error) => {
            throw error
        }

        authenticationAPI.SignUp(request, response, next)
    })
})