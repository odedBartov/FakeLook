const express = require('express')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (res, file, callback) => {
        callback(null, 'uploads')
    },
    filename: (res, file, callback) => {
        callback(null, file.originalname)
    }
})
const upload = multer({storage: storage})

const router = express.Router();
const postAPI = require('./postsAPI')

router.post('/getPosts', postAPI.GetPosts)

router.post('/publishPost', upload.single('image'), postAPI.PublishPost)

router.post('/likePost', postAPI.LikePost)

router.post('/publishComment', postAPI.PublishComment)

router.post('/likeComment', postAPI.LikeComment)

module.exports = router