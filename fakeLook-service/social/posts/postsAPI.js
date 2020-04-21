class postsAPI {
  currentController = "Social"
  dbService
  errorHandler
  currentUrl
  enviroment
  logger
  constructor(postsDAO, ErrorHandler, CurrentUrl, enviroment, logger) {
    this.dbService = postsDAO
    this.errorHandler = ErrorHandler
    this.currentUrl = CurrentUrl
    this.enviroment = enviroment
    this.logger = logger
  }

  GetPosts(req, res, next) {
    const recievedFilter = req.body
    var filter = buildPost(recievedFilter)
    filter.from = recievedFilter.from
    filter.data.dateFrom = recievedFilter.dateFrom
    filter.data.dateTo = recievedFilter.dateTo
    filter.data.radius = recievedFilter.radius
    this.logger.writeInfo(this.currentController, 'GetPosts', `request to get posts with according filters: ${JSON.stringify(filter)}`)
    this.dbService.getPosts(filter, (error, data) => {
      if (error) {
        this.logger.writeError(this.currentController, 'GetPosts', error.message)
        next(error)
      } else {
        res.send(data)
      }
    })
  }

  getAmountOfPosts(req, res, next) {
    this.dbService.getAmountOfPosts((err, amount) => {
      if (err) {
        this.logger.writeError(this.currentController, 'getAmountOfPosts', error.message)
        next(err)
      }
      else {
        res.send({ 'amount': amount })
      }
    })
  }

  GetPost(req, res, next) {
    this.logger.writeInfo(this.currentController, 'GetPost', `request to get post with id: ${req.query.postId}`)
    this.dbService.getPost(req.query.postId, (error, data) => {
      if (error) {
        this.logger.writeError(this.currentController, 'GetPost', error.message)
        next(error)
      } else {
        if (data) {
          data.likes = data.likes ? data.likes.length : 0
          res.send(data)
        }
        else{
          next(this.errorHandler.createError(`post with such ID could not be found\npostId: ${req.query.postId}`, 400))
        }
      }
    })
  }

  PublishPost(req, res, next) {
    this.logger.writeInfo(this.currentController, 'PublishPost', `request to publish post by publisherId of: ${req.user.id}`)
    const image = req.file
    if (!image) {
      this.logger.writeError(this.currentController, 'PublishPost', 'no image provided')
      next(this.errorHandler.createError('No image provided', 400))//?
    } else {
      var post = JSON.parse(req.body.post)
      post.image_url = `${this.currentUrl}/${req.file.path}`
      const date = new Date();
      post.publishedDate = `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}`
      post.publisherId = req.user.id

      this.dbService.CheckIfUsernamesExist(post.user_tags.split(','), (err, data) => {
        if (err) {
          this.logger.writeError(this.currentController, 'PublishPost', err.message)
          next(err)//?
        } else {
          if (data.length) {
            this.logger.writeError(this.currentController, 'PublishPost', `try to tagged users whom does not exist!\nNames: ${data}`)
            next(this.errorHandler.createError(
              `You tagged users whom does not exist!\nNames: ${data}`,
              400
            ))
          } else {
            this.dbService.publishPost(post, (err, data) => {
              if (err) {
                this.logger.writeError(this.currentController, 'PublishPost', err.message)
                next(err)
              } else {
                const postToShow = {
                  post_id:data._id,
                  location:post.location,
                  image_url:post.image_url,
                  post_text:post.text
                } 
                this.logger.writeInfo(this.currentController, 'PublishPost', `post by id of ${postToShow.post_id} published successfully`)
                res.json(postToShow)
              }
            })
          }
        }
      })
    }
  }

  LikePost(req, res, next) {
    this.logger.writeInfo(this.currentController, 'LikePost', `request to like postId of: ${req.query.postId}`)
    const postId = req.query.postId
    const userId = req.user.id
    setTimeout(() => {  
    this.dbService.checkIfLikedPost(postId, (err, data) => {
      if (err) {
        this.logger.writeError(this.currentController, 'LikePost', err.message)
        next(err)
      } else {
        const isLiked = data && data.includes(userId)
        const like = isLiked ? this.dbService.dislikePost : this.dbService.likepost        
        like(postId, userId, (err, data) => {
          if (err) {
            this.logger.writeError(this.currentController, 'LikePost', err.message)
            next(err)
          } else {
            this.logger.writeInfo(this.currentController, 'LikePost', `request to like postId of: ${req.query.postId} been succesfully`)
            res.send(!isLiked)
          }
        })
      }
    })
  }, 500);
  }

  checkIfLikedPost(req, res, next) {
    this.logger.writeInfo(this.currentController, 'checkIfLikedPost', `request to check if  postId of ${req.query.postId} is liked`)
    const postId = req.query.postId
    const userId = req.user.id
    this.dbService.checkIfLikedPost(postId, (err, data) => {
      if (err) {
        this.logger.writeError(this.currentController, 'checkIfLikedPost', err.message)
        next(err)
      } else {
        this.logger.writeInfo(this.currentController, 'checkIfLikedPost', `checking if postId of ${req.query.postId} is liked, been succesfully`)
        res.send(data && data.includes(userId))
      }
    })
  }

  PublishComment(req, res, next) {
    this.logger.writeInfo(this.currentController, 'PublishComment', `request to publish comment for postId of ${req.query.postId}`)
    var comment = req.body
    this.dbService.publishComment(comment, (error, data) => {
      if (error) {
        this.logger.writeError(this.currentController, 'PublishComment', err.message)
        next(error)
      } else {
        this.logger.writeInfo(this.currentController, 'PublishComment', `publishing comment for postId of ${req.query.postId} is been successfully`)
        res.send(JSON.stringify(data))
      }
    })
  }

  createUser(user, callback) { 
    this.dbService.createUser(user, (error) => {
      if (error) {
        callback(error)
      } else {
        callback(undefined)
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