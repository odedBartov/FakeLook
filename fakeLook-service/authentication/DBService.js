const sql = require('mssql')

const config = require('../credentials').usersDB_Config

/* const dbPool = new sql.ConnectionPool(config, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('connected to DB from Authentication!')
  }
})
 */
module.exports = {
  CheckIfUserExist: function (userName, callback) {
    var dbreq = dbPool.request()
    dbreq.input('UserName', sql.NVarChar(50), userName)
    dbreq.execute('SP_CheckUserName', (err, data) => {
      if (err) {
        callback(err, undefined)
      } else {
        callback(undefined, data.recordset[0])
      }
    })
  },

  InsertUser: function (user, callback) {
    var dbreq = dbPool.request()
    dbreq.input('UserName', sql.NVarChar(20), user.userName)
    dbreq.input('Password', sql.NVarChar(60), user.password)
    dbreq.input('email', sql.NVarChar(30), user.email)
    dbreq.execute('SP_InsertUser', (err, data) => {
      if (err) {
        callback(err, undefined)
      } else {        
        callback(undefined, data.recordset[0])
      }
    })
  },

  GetPassword: function (userName, callback) {
    dbreq = dbPool.request()
    dbreq.input('UserName', sql.NVarChar(15), userName)
    dbreq.execute('SP_GetPassword', (err, data) => {
      if (err) {
        callback(err, undefined)
      } else {
        callback(undefined, data.recordset[0])
      }
    })
  }
}
