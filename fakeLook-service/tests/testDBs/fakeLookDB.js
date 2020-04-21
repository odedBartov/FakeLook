class fakeLookDB{
    constructor(){ }

    posts = []

    setPosts(posts){
        this.posts = posts
    }

    getPosts(){
        return this.posts
    }
}

module.exports = fakeLookDB