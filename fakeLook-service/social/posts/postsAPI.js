const dbService = require('./DBService')

module.exports = {
  GetPosts: function (req, res, next) {
    const filter = req.body
    dbService.getPosts(filter, (error, data) => {
      if (error) {
        next(error)
      } else {
        res.send(data)
      }
    })
  },

  GetPost: function (req, res, next) {
    dbService.getPost(req.query.postId, (error, data) => {
      if (error) {
        next(error)
      } else {
        console.log(data)

        res.send(data)
      }
    })
  },

  PublishPost: function (req, res, next) {
    const image = req.file
    if (!image) {
      var err = new Error()
      err.message = 'No file provided'
      err.status = 401
      next(err)
    } else {
      var post = { data: {}, imageTags: [], taggedUsers: [] }
      var receivedPost = JSON.parse(req.body.post)

      post.data.latitude = receivedPost.latitude
      post.data.longitude = receivedPost.longitude
      post.data.publishedDate = receivedPost.publishedDate
      post.data.text = receivedPost.text

      if (receivedPost.imageTags) {
        receivedPost.imageTags.split(',').forEach(tag => {
          post.imageTags.push({ title: tag })
        })
      }

      if (receivedPost.taggedUsers) {
        receivedPost.taggedUsers.split(',').forEach(tag => {
          post.taggedUsers.push({ username: tag })
        })
      }

      post.data.imageSrc = `http://localhost:1000/${req.file.path}`
      post.data.userUpId = 1
      dbService.insertPost(post, (err, data) => {
        if (err) {
          next(err)
        } else {
          res.json(post)
        }
      })
    }
  },

  LikePost: function (req, res, next) {
    const postId = req.query.postId
    dbService.checkIfLikedPost(postId, (err, data) => {
      if (err) {
          
          next(err)
        } else {
            console.log(data);         
            const like = data? dbService.dislikePost : dbService.likepost
            like(postId, (err, data) => {
                if (err) {
                    console.log(err);
                next(err)
            }
            else{
                res.send(data)
            }
        })
      }
    })
    //like or dislike
  },

  checkIfLikedPost (postId) {},

  PublishComment: function (user, comment) {},

  LikeComment: function (user, comment) {}
}
