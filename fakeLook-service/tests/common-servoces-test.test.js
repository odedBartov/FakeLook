const assert = require('chai').assert
const container = require('./containerConfigForTests')
const jwtService = container.get('JWTservice')

/* describe("the tests for common services", () => {
    it("test the jwt service", () => {        
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
}) */