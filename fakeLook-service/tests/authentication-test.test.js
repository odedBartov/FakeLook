const expect = require('expect')
const assert = require('chai').assert
const container = require('../containerConfig')
const errorHandler = container.get('errorHandler')


describe("the tests for common services", () => {
    const name = "oded"
    it("should just check", () => {
        const token = errorHandler.createToken("id")
        
    })

    it("check the chai", () => {
        assert.equal(name, "oded")
    })
})