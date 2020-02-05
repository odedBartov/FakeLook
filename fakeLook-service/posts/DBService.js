const sql = require('mssql')

const config = require('../credentials')

//need to change this connection to db of social!

const dbPool = new sql.ConnectionPool(config).
    connect().
    then(pool => pool).
    catch(err => console.log(err));


/* const services = {  } */
module.exports = {
    InsertTag: async function (title, postId, callback) {
        var dbreq = (await dbPool).request()
        dbreq.input('title', sql.NVarChar(50), title);
        dbreq.input('postId', sql.BigInt, postId);

        dbreq.execute('dbo.SP_InsertImageTag', (err, data) => {
            if (err) {
                callback(err, false)
            } else {
                callback(undefined, true)
            }
        })
    },
}

/* const config = {
    server: 'localhost',
    database: 'UsersDB',
    user: 'oded',
    password: '1234'
}
 */
// const dbPool = new sql.ConnectionPool(config, err => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('connected to DB!')
//   }
// })