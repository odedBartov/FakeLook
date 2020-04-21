class fakeLookDB {
    constructor() { }

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
}

module.exports = fakeLookDB 