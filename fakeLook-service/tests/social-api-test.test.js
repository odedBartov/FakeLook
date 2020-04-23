const assert = require('chai').assert
const container = require('./containerConfigForTests')

describe("the tests for social API", () => {
    const socialAPI = container.get('postsAPI')
    const fakeDB = container.get('fakeLookDB')

    const posts = [{ id: 1, text: "this is a dummy post" }, { id: 2, text: "this is also a dummy post" }]
    fakeDB.setPosts(posts)

    it("should add new post", () => {
        let postData = {
            id: 3,
            text: "I love banana",
            image_tags: "cat,shampoo",
            user_tags: "oded",
            location: { lat: 32, lon: 34 }
        }
        const request = {
            user: {
                id: 1
            },
            file: {
                path: "rabbi.jpg"
            },
            body: {
                post: JSON.stringify(postData)
            }
        }
        const currentLength = fakeDB.getPosts().length;
        const response = {
            json: (data) => {
                assert.equal(fakeDB.getPosts().length, currentLength + 1)
            }
        }
        const next = (error) => {
            assert.throw(error)
        }
        socialAPI.PublishPost(request, response, next)
    })

    it("should get all the posts", () => {
        const request = { body: {} }
        const response = {
            send: (data) => {
                assert.equal(fakeDB.getPosts(), data)
            }
        }
        const next = (error) => {
            assert.throw(error)
        }
        socialAPI.GetPosts(request, response, next)
    })

    it("should get post of id 3", () => {
        const request = { query: { postId: 3 } }
        const response = {
            send: (data) => {
                assert.equal(3, data.id)
            }
        }
        const next = (error) => {
            assert.throw(error)
        }
        socialAPI.GetPost(request, response, next)
    })

    it("should get amount of all posts", () => {
        const request = { body: {} }
        const response = {
            send: (data) => {
                assert.equal(fakeDB.getPosts().length, data.amount)
            }
        }
        const next = (error) => {
            assert.throw(error)
        }
        socialAPI.getAmountOfPosts(request, response, next)
    })

})