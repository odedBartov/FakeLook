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

const container = require('../../containerConfig')

const jwtService = container.get('JWTservice')
const postAPI = container.get('postsAPI')
const router = express.Router()

router.use((req, res, next) => jwtService.validateToken(req, res, next))

router.post('/getPosts', (req, res, next) => {
    postAPI.GetPosts(req, res, next)
})

router.get('/getPost', (req, res, next) => {
    postAPI.GetPost(req, res, next)
})

router.post('/publishPost', upload.single('image'),  (req, res, next) => {
    postAPI.PublishPost(req, res, next)
})

router.get('/likePost', (req, res, next) => {
    postAPI.LikePost(req, res, next)
})

router.get('/checkIfLikedPost', (req, res, next) => {
    postAPI.checkIfLikedPost(req, res, next)
})

router.post('/publishComment', (req, res, next) => {
    postAPI.PublishComment(req, res, next)
})

module.exports = router