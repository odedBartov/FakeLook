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