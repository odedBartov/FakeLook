const assert = require('chai').assert
const container = require('./containerConfigForTests')

describe("the tests for social API", () => {
    const socialAPI = container.get('postsAPI')
    const fakeDB = container.get('fakeLookDB')

    const posts = [{id: 1, text: "this is a dummy post"}, {id: 2, text: "this is also a dummy post"}]
    fakeDB.setPosts(posts)
    it("should get all the posts", () => {
        const request = { body: {} }
        const response = {
            send: (data) => {
                assert.equal(posts, data)
            }
        }
        const next = (error) => {
            throw error
        }
        socialAPI.GetPosts(request, response, next)
    })
})