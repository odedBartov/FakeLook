const dbService = require('./DBService')
const path = require("path");


module.exports = {
    GetPosts: function (req, res, next) {
        const filter = req.body
        // dbService.getPosts(filter, (error, data) => {
        //     if (error){
        //         next(error)
        //     }
        //     else{
        //         res.send(data)
        //     }
        // })
        const p1 = {};        
        p1.imageSrc = 'https://media.wired.com/photos/5e1e646743940d0008009167/master/pass/Science_Cats-84873657.jpg';
        p1.imageTags = ['cat', 'cute', 'grumpy'];
        p1.taggedUsers = ['me', 'you'];
        p1.publishDate = new Date();
        p1.publisherName = 'oded';
        p1.text = 'watch my cat!';
        p1.latitude = 32.115;
        p1.longitude = 34.835;
        const posts = [p1];
        res.send(posts)
    },

    PublishPost: function (req, res, next) {
        const image = req.file        
        if (!image) {
            var err = new Error()
            err.message = 'No file provided'
            err.status = 401
            next(err)
        }

        else{
            var post = JSON.parse(req.body.post)
            const p = path.join(__dirname, '../..')
            post.imageSrc = `${p}\\${req.file.path}`
            
            //To do: save to DB
            res.json(post)
        }
    },

    LikePost: function (user, post) {

    },

    PublishComment: function (user, comment) {

    },

    LikeComment: function (user, comment) {

    },
};
