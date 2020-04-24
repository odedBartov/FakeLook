<<<<<<< HEAD
class fakeLookDB{
    constructor(){ }
    users = []
=======
class fakeLookDB {
    constructor() { }

>>>>>>> unit-test-server-mushky
    posts = []
    users = [{ username: "oded", id: 1, email: "oded@gmail.com" }]//?
    
    getUsers() {
        return this.users
    }
    setPosts(posts) {
        this.posts = posts
    }

    getPosts() {
        return this.posts
    }

    getPost(postId){
        return this.posts.find(p => p.postId = postId)
    }

    createUser(user){
        this.users.push(user)
    }

    getLikes(postId){
        return this.posts.find(p => p.id = postId).likes
    }

    likePost(postId, userId){
        this.posts.find(p => p.id = postId).likes.push(userId)
    }

    dislikePost(postId, userId){
        const likes = this.posts.find(p => p.id = postId).likes
        likes.splice(likes.indexOf(userId), 1)
    }

    publishComment(comment, postId){        
        this.posts.find(p => p.postId == postId).comments.push(comment)
    }
}

module.exports = fakeLookDB 