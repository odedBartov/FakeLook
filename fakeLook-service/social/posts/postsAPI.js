const dbService = require('./DBService')
const errorHandler = require('../../common/errorHandler')
module.exports = {
  GetPosts: function (req, res, next) {
    const filter = req.body    
    dbService.getPosts(filter, (error, data) => {
      if (error) {
        next(error)
      } else {                
        res.send(data[0])
      }
    })
  },

  GetPost: function (req, res, next) {
    dbService.getPost(req.query.postId, (error, data) => {
      if (error) {
        next(error)
      } else {
        var post = data[0][0]
        post.imageTags = []
        post.taggedUsers = []

        data[1].forEach(tag => {
          post.imageTags.push(tag.title)
        })

        data[2].forEach(tag => {
          post.taggedUsers.push(tag.username)
        })
        post.likes = data[3][0].likes
        res.send(post)
      }
    })
  },

  PublishPost: function (req, res, next) {
    const image = req.file
    if (!image) {
      errorHandler.throwException('No image provided', 401)
    } else {
      var receivedPost = JSON.parse(req.body.post)
      var post = buildPost(receivedPost)
      post.data.imageSrc = `http://localhost:1000/${req.file.path}`
      post.data.userUpId = 1

      const usernames = post.taggedUsers
      dbService.CheckIfUsernamesExist(usernames, (err, data) => {
        if (err) {
          next(err)
        } else {
          if (data[0].length) {
            errorHandler.throwException(
              `You tagged users whom does not exist!\nNames: ${data[0].map(
                u => u.username
              )}`,
              401
            )
          } else {
            dbService.insertPost(post, (err, data) => {
              if (err) {
                next(err)
              } else {
                res.json(post)
              }
            })
          }
        }
      })
    }
  },

  LikePost: function (req, res, next) {
    const postId = req.query.postId
    const userId = 2
    // from JWT!
    dbService.checkIfLikedPost(postId, userId, (err, data) => {
      if (err) {
        next(err)
      } else {
        const isLiked = data[0].length > 0
        const like = isLiked ? dbService.dislikePost : dbService.likepost
        like(postId, userId, (err, data) => {
          if (err) {
            next(err)
          } else {
            res.send(!isLiked)
          }
        })
      }
    })
  },

  checkIfLikedPost: function (req, res, next) {
    const postId = req.query.postId
    const userId = 2
    //from JWT
    dbService.checkIfLikedPost(postId, userId, (err, data) => {
      if (err) {
        next(err)
      } else {
        res.send(data[0].length > 0)
      }
    })
  },

  PublishComment: function (user, comment) {},

  LikeComment: function (user, comment) {}
}

const buildPost = function (receivedPost) {
  var post = { data: {}, imageTags: [], taggedUsers: [] }
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

  return post
}
