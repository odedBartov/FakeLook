const express = require('express')
const app = express()
const bp = require('body-parser')
const path = require('path')
const cors = require('cors')
const socketio = require('socket.io')

const swaggerUi = require('swagger-ui-express')
YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const authController = require('./authentication/authenticationController')
const postsController = require('./social/posts/postsController')
const friendsController = require('./social/friends/friendsController')


app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', '*')
  next()
})

app.use(bp.json())

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(bodyParser.json({limit: 10 * 1024 * 1024}))
app.use(bodyParser.raw({limit: 10 * 1024 * 1024}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/authentication', authController)

app.use('/posts', postsController)

app.use('/friends', friendsController)

app.use((err, req, res, next) => {
 // fs.appendFile('Log.txt', `Error thrown at ${new Date()}${err}` + '\n\n\n', () => {})

  res.status(err.status ? err.status : 500).send(err)
})

server = app.listen(1000, () => {
  console.log('server is working')  
})

const io = socketio(server)
io.on('connect', (socket => {
  socket.on('like', (data) => {    
    socket.broadcast.emit('like', data)
  })

  socket.on('newComment', (comment) => { 
    socket.broadcast.emit('newCommentPostId' + comment.postId, comment.comment)
  })

  socket.on('newPost',(post)=> {
    socket.broadcast.emit('newPostData',post)})
}))
