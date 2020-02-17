const sql = require('mssql')

module.exports = {

}

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
        dbreq.input('radius', sql.number, filter.radius)
        dbreq.input('longitude', sql.Float, filter.longitude)
        dbreq.input('latitude', sql.Float, filter.latitude)

        dbreq.input('groups', sql.Float, filter.latitude)
        dbreq.input('imageTags', sql.Float, filter.latitude)
        dbreq.input('taggedusers', sql.Float, filter.latitude)

        dbreq.execute('SP_GetPosts', (err, data) => {
            if (err) {
                callback(err, undefined)
            } else {
                callback(undefined, data.recordsets)
            }
        })
    }
}