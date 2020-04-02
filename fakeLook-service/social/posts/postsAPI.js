class postsAPI {
  dbService
  errorHandler
  currentUrl
  enviroment
  constructor(postsDAO, ErrorHandler, CurrentUrl, enviroment) {
    this.dbService = postsDAO
    this.errorHandler = ErrorHandler
    this.currentUrl = CurrentUrl
    this.enviroment = enviroment
  }

  GetPosts(req, res, next) {
    const recievedFilter = req.body
    var filter = buildPost(recievedFilter)
    filter.from = recievedFilter.from
    filter.data.dateFrom = recievedFilter.dateFrom
    filter.data.dateTo = recievedFilter.dateTo
    filter.data.radius = recievedFilter.radius
    this.dbService.getPosts(filter, (error, data) => {
      if (error) {
        next(error)
      } else {
        res.send(data)
      }
    })
  }

  getAmountOfPosts(req, res, next) {
    this.dbService.getAmountOfPosts((err, amount) => {
      if (err) {
        next(err)
      }
      else {
        res.send({ 'amount': amount })
      }
    })
  }

  GetPost(req, res, next) {
    this.dbService.getPost(req.query.postId, (error, data) => {
      if (error) {
        next(error)
      } else {
        data.likes = data.likes ? data.likes.length : 0
        res.send(data)
      }
    })
  }

  PublishPost(req, res, next) {
    const image = req.file
    if (!image) {
      this.errorHandler.throwException('No image provided', 400)
    } else {
      var post = JSON.parse(req.body.post)
      post.image_url = `${this.currentUrl}/${req.file.path}`
      const date = new Date();
      post.publishedDate = `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}`
      post.publisherId = req.user.id

      this.dbService.CheckIfUsernamesExist(post.user_tags.split(','), (err, data) => {
        if (err) {
          next(err)
        } else {
          if (data.length) {
            this.errorHandler.throwException(
              `You tagged users whom does not exist!\nNames: ${data}`,
              400
            )
          } else {
            this.dbService.publishPost(post, (err, data) => {
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
  }

  LikePost(req, res, next) {
    const postId = req.query.postId
    const userId = req.user.id
    setTimeout(() => {  
    this.dbService.checkIfLikedPost(postId, (err, data) => {
      if (err) {
        next(err)
      } else {
        const isLiked = data && data.includes(userId)
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
  }, 500);
  }

  checkIfLikedPost(req, res, next) {
    const postId = req.query.postId
    const userId = req.user.id
    this.dbService.checkIfLikedPost(postId, (err, data) => {
      if (err) {
        next(err)
      } else {
        res.send(data && data.includes(userId))
      }
    })
  }

  PublishComment(req, res, next) {
    var comment = req.body
    comment.comment_publisher = this.enviroment.currentUserName
    this.dbService.publishComment(comment, (error, data) => {
      if (error) {
        next(error)
      } else {
        res.send(data[0])
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