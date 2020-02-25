const express = require('express')
const app = express()
const bp = require('body-parser')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const authController = require('./authentication/authController')
const postsController = require('./social/posts/postsController')
const friendsController = require('./social/friends/friendsController')
const errorHandler = require('./common/errorHandler')

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', '*')
    next()
})
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//     )
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Expose-Headers', '*')
//     next()
// })

app.use(bp.json())

app.use((req, res, next) => {
    errorHandler.setNext(next)
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/authentication', authController)

app.use('/posts', postsController)

app.use('/friends', friendsController)


app.use((err, req, res, next) => {
    fs.appendFile('Log.txt', `Error thrown at ${new Date()}${err}` + "\n\n\n", () => { })
    res.status(err.status ? err.status : 500).send(err.message)
})

app.listen(1000, () => {
    console.log("server is working")
})