const express = require('express')

const router = express.Router();
const postAPI = require('./postsAPI')

router.post('/getPosts', postAPI.GetPosts)

router.post('/publishPost', postAPI.PublishPost)

router.post('/likePost', postAPI.LikePost)

router.post('/publishComment', postAPI.PublishComment)

router.post('/likeComment', postAPI.LikeComment)

module.exports = router