const sql = require('mssql')

module.exports = {

}

const config = require('../../credentials')

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('connected to DB from Posts!')
  }
})