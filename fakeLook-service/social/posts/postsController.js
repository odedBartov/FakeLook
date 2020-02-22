const express = require('express')

const multer = require('multer')
//const storage = multer.memoryStorage();

const storage = multer.diskStorage({
    destination: (res, file, callback) => {
        callback(null, 'uploads')
    },
    filename: (res, file, callback) => {
        const date = new Date()
        callback(null, `${file.originalname}-${date.getMinutes()}-${date.getHours()}-${date.getDate()}-${date.getFullYear()}`)
    }
})
const upload = multer({storage: storage})

const jwtService = require('../../common/JWT_Service')
const postAPI = require('./postsAPI')
const router = express.Router()

router.use(jwtService.validateToken)

router.post('/getPosts', postAPI.GetPosts)

router.get('/getPost', postAPI.GetPost)

router.post('/publishPost', upload.single('image'), postAPI.PublishPost)

router.get('/likePost', postAPI.LikePost)

router.get('/checkIfLikedPost', postAPI.checkIfLikedPost)

router.post('/publishComment', postAPI.PublishComment)

router.get('/likeComment', postAPI.LikeComment)

module.exports = router