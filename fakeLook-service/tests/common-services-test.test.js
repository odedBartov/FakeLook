const expect = require('expect')
const assert = require('chai').assert
const container = require('../containerConfig')
const jwtService = container.get('JWTservice')


describe("the tests for common services", () => {
    const name = "oded"
    it("should just check", () => {        
        const id = "some_id"
        const token = jwtService.createToken(id)
        jwtService.validateToken(token, (err, data) => {
            if (err) {
                assert.Throw(err)
            }
            else{
                assert.equal(data.id, id)
            }
        })
    })

    it("check the chai", () => {
        assert.equal(name, "oded")
    })
})