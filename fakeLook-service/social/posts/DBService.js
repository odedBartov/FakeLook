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
    dbreq.input('dateFrom', sql.DateTime, filter.dateFrom)
    dbreq.input('dateTo', sql.DateTime, filter.dateTo)
    dbreq.input('radius', sql.Float, filter.radius)
    dbreq.input('longitude', sql.Float, filter.longitude)
    dbreq.input('latitude', sql.Float, filter.latitude)

    //dbreq.input('groups', sql.Float, filter.latitude)
    // dbreq.input('imageTags', sql.Float, filter.latitude)
    // dbreq.input('taggedusers', sql.Float, filter.latitude)

    dbreq.execute('SP_GetPosts', (err, data) => {
      if (err) {
        callback(err, undefined)
      } else {
        callback(undefined, data.recordset)
      }
    })
  },

  getPost: function (postId, callback) {
    var dbreq = dbPool.request()
    dbreq.input('postId', sql.BigInt, postId)
    dbreq.execute('SP_GetPost', (err, data) => {
      if (err) {
        callback(err, undefined)
      } else {
        callback(undefined, data.recordset[0])
      }
    })
  },

  insertPost: function (post, callback) {
    var dbreq = dbPool.request()
    dbreq.input('postData', JSON.stringify(post.data))
    dbreq.input('taggedUsers', JSON.stringify(post.taggedUsers))
    dbreq.input('imageTags', JSON.stringify(post.imageTags))
    dbreq.execute('SP_InsertPost', (err, data) => {
      if (err) {
        callback(err, undefined)
      } else {
        callback(undefined, data)
      }
    })
  },

  likepost: function (postId, callback) {},

  dislikePost: function (postId, callback){},

  checkIfLikedPost (postId, callback) {
    const userId = 2
    
    //from JWT!
    var dbreq = dbPool.request()
    dbreq.inout('postId', sql.BigInt, postId)
    dbreq.input('userId', sql.BigInt, userId)
    dbreq.execute('SP_CheckIfUserLikedPost', (err, data) => {
        if (err) {
            callback(err, undefined)
        }
        else{
            callback(undefined, data.recordset[0])
        }
    })
  }
}
