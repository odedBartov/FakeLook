const express = require('express')
const app = express()

const authController = require('./authentication/authController')
const postsController = require('./posts/postsController')
const friendsController = require('./friends/friendsController')
const socialController = require('./social/socialController')

//checking 
const dbService = require('./posts/DBService');
dbService.InsertTag("HKI",3,(r)=>console.log(r));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

 app.use('/authentication', authController)

 app.use('/posts', postsController)

 app.use('/friends', friendsController)

 app.use('/social', socialController)


app.use((err, req, res, next) => {
    res.status(err.status ? err.status:500).send(err.message)
  })

  app.listen(1000, () => {
      console.log("server is working")
  })