class fakeLookDB{
    constructor(){ }
    user = []
    posts = []

    setPosts(posts){
        this.posts = posts
    }

    getPosts(){
        return this.posts
    }

    createUser(user){
        this.user.push(user)
    }
}

module.exports = fakeLookDB 