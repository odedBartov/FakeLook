const sql = require('mssql')

const services = {  }
module.exports = services

const config = {
    server: 'localhost',
    database: 'UsersDB',
    user: 'oded',
    password: '1234'
}

// const dbPool = new sql.ConnectionPool(config, err => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('connected to DB!')
//   }
// })