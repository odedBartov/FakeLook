const assert = require('chai').assert
const container = require('./containerConfigForTests')

describe("the tests for social API", () => {
    const socialAPI = container.get('postsAPI')
    const fakeDB = container.get('fakeLookDB')
    const userId = "123"
    const postId = "1"

    const posts = [{postId: postId, text: "this is a dummy post", likes: [userId], comments: []}, 
                    {ipostId: 2, text: "this is also a dummy post", likes: [], comments: []}]
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
            throw error
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

    it("should check like function", () => {
        const request = { query: {postId: postId}, user: {id: userId} }
        const likedResponse = {
            send: (data) => {                
               assert.equal(false, data)
            }
        }
        const dislikedResponse = {
            send: (data) => {                
                assert.equal(true, data)
             }
        }
        const next = (error) => {
            throw error
        }
        socialAPI.LikePost(request, likedResponse, next)
        socialAPI.LikePost(request, dislikedResponse, next)
    })

    it("should publish a comment", () => {
        const comment = {text: "cmment text", commentId: "123", postId: postId}
        const request = { body: comment, query: {postId: postId} }
        
        const response = {
            send: (data) => {
                const comments = fakeDB.getPost(postId).comments
                assert.equal(comments.pop(), comment)
            }
        }
        const next = (error) => {
            throw error
        }
        socialAPI.PublishComment(request, response, next)
    })
})