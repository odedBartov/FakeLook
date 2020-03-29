class postsAPI {
  dbService
  errorHandler
  currentUrl
  constructor(postsDAO, ErrorHandler, CurrentUrl) {
    this.dbService = postsDAO
    this.errorHandler = ErrorHandler
    this.currentUrl = CurrentUrl
  }

  GetPosts(req, res, next) {
    const recievedFilter = req.body
    var filter = buildPost(recievedFilter)
    filter.data.dateFrom = recievedFilter.dateFrom
    filter.data.dateTo = recievedFilter.dateTo
    filter.data.radius = recievedFilter.radius * 1000
    this.dbService.getPosts(filter, (error, data) => {
      if (error) {
        next(error)
      } else {
        res.send(data)
      }
    })
  }

  GetPost(req, res, next) {
    this.dbService.getPost(req.query.postId, (error, data) => {
      if (error) {
        next(error)
      } else {
        var post = data[0]
        post.postId = req.query.postId
        res.send(post)
      }
    })
  }

  PublishPost(req, res, next) {
    const image = req.file
    if (!image) {
      this.errorHandler.throwException('No image provided', 400)
    } else {
      var receivedPost = JSON.parse(req.body.post)
      var post = buildPost(receivedPost)
      post.data.publishedDate = receivedPost.publishedDate
      post.data.text = receivedPost.text
      post.data.imageSrc = `${this.currentUrl}/${req.file.path}`
      post.data.userUpId = req.user.id
      console.log(req.user)

      this.dbService.CheckIfUsernamesExist(post.taggedUsers, (err, data) => {
        if (err) {
          next(err)
        } else {
          if (data.length) {
            this.errorHandler.throwException(
              `You tagged users whom does not exist!\nNames: ${data[0].map(
                u => u.username
              )}`,
              400
            )
          } else {
            this.dbService.insertTags(post.imageTags, (err, data) => {
              if (err) {
                next(err)
              } else {
                this.dbService.insertPost(post, (err, data) => {
                  if (err) {
                    next(err)
                  } else {
                    console.log(data)
                    res.json(post)
                  }
                })
              }
            })
          }
        }
      })
    }
  }

  LikePost(req, res, next) {
    const postId = req.query.postId
    const userId = req.user.id

    this.dbService.checkIfLikedPost(postId, userId, (err, data) => {
      if (err) {
        next(err)
      } else {
        const isLiked = data.length != 0
        const like = isLiked ? this.dbService.dislikePost : this.dbService.likepost
        like(postId, userId, (err, data) => {
          if (err) {
            next(err)
          } else {
            res.send(!isLiked)
          }
        })
      }
    })
  }

  checkIfLikedPost(req, res, next) {
    const postId = req.query.postId
    const userId = req.user.id
    this.dbService.checkIfLikedPost(postId, userId, (err, data) => {
      if (err) {
        next(err)
      } else {
        res.send(data.length != 0)
      }
    })
  }

  PublishComment(req, res, next) {
    var comment = req.body
    comment.userId = req.user.id
    this.dbService.publishComment(comment, (error, data) => {
      if (error) {
        next(error)
      } else {
        res.send(data[0])
      }
    })
  }

  createUser(user, callback) {
    this.dbService.createUser(user, (error, data) => {
      if (error) {
        callback(error, undefined)
      } else {
        callback(undefined, user)
      }
    })
  }
}

const buildPost = function (received) {
  var post = { data: {}, imageTags: [], taggedUsers: [] }
  post.data.latitude = received.latitude
  post.data.longitude = received.longitude

  if (received.imageTags) {
    post.imageTags = received.imageTags.split(',').map(tag => {
      return { imageTag: tag }
    })
  }

  if (received.taggedUsers) {
    post.taggedUsers = received.taggedUsers.split(',').map(tag => {
      return { UN: tag }
    })
  }

  if (post.taggedUsers.length == 0) {
    post.taggedUsers = undefined
  }

  if (post.imageTags.length == 0) {
    post.imageTags = undefined
  }
  return post
}

module.exports = postsAPI