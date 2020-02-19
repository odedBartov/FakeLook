const sql = require('mssql')

module.exports = {}

const config = require('../../credentials').socialDB_Config

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('connected to DB from Posts!')
  }
})

module.exports = {
  getPosts: function (filter, callback) {
    var dbreq = dbPool.request()
    dbreq.input('dateFrom', sql.Date, filter.dateFrom)
    dbreq.input('dateTo', sql.Date, filter.dateTo)
    dbreq.input('radius', sql.Float, filter.radius)
    dbreq.input('longitude', sql.Float, filter.longitude)
    dbreq.input('latitude', sql.Float, filter.latitude)

    // dbreq.input('groups', sql.Float, filter.latitude)
    // dbreq.input('imageTags', sql.Float, filter.latitude)
    // dbreq.input('taggedusers', sql.Float, filter.latitude)

    dbreq.execute('SP_GetPosts', (err, data) => {
      handleDbResponses(err, data, callback)
    })
  },

  getPost: function (postId, callback) {
    var dbreq = dbPool.request()
    dbreq.input('postId', sql.BigInt, postId)
    dbreq.execute('SP_GetPost', (err, data) => {
      handleDbResponses(err, data, callback)
    })
  },

  insertPost: function (post, callback) {
    var dbreq = dbPool.request()
    dbreq.input('postData', JSON.stringify(post.data))
    dbreq.input('taggedUsers', JSON.stringify(post.taggedUsers))
    dbreq.input('imageTags', JSON.stringify(post.imageTags))
    dbreq.execute('SP_InsertPost', (err, data) => {
      handleDbResponses(err, data, callback)
    })
  },

  likepost: function (postId, userId, callback) {
    var dbreq = dbPool.request()
    dbreq.input('postId', sql.BigInt, postId)
    dbreq.input('userId', sql.BigInt, userId)
    dbreq.execute('SP_LikePost', (err, data) => {
      handleDbResponses(err, data, callback)
    })
  },

  dislikePost: function (postId, userId, callback) {
    var dbreq = dbPool.request()
    dbreq.input('postId', sql.BigInt, postId)
    dbreq.input('userId', sql.BigInt, userId)
    dbreq.execute('SP_DisLikePost', (err, data) => {
      handleDbResponses(err, data, callback)
    })
  },

  checkIfLikedPost: function (postId, userId, callback) {
    var dbreq = dbPool.request()
    dbreq.input('postId', sql.BigInt, postId)
    dbreq.input('userId', sql.BigInt, userId)
    dbreq.execute('SP_CheckIfUserLikedPost', (err, data) => {
      handleDbResponses(err, data, callback)
    })
  },
  CheckIfUsernamesExist:function (usernames, callback) {
    var dbreq = dbPool.request()
    dbreq.input('usernames', JSON.stringify(usernames))
    dbreq.execute('SP_CheckIfUsernamesExist', (err, data) => {
      handleDbResponses(err, data, callback)
    })
  }
}

const handleDbResponses = function (err, data, callback) {
  if (err) {
    callback(err, undefined)
  } else {
    callback(undefined, data.recordsets)
  }
}
