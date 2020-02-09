const sql = require('mssql')
const genericRepo = require('../services/genericRepo');
const config = require('../credentials')
const postModel = require('./models/postModel')



//need to change this connection to db of social!

const dbPool = new sql.ConnectionPool(config).
    connect().
    then(pool => pool).
    catch(err => console.log(err));

g, h
/* const services = {  } */
module.exports = {
    InsertImageTag: async function (title, postId) {
        let data = {
            "title": title,
            "postId": postId
        }
        await genericRepo.executeProcedure(data, "SP_InsertImageTag", (err, data) => {
            if (err) {
                //send response object with the err?
            }
            else {
             return data;//?also return object of response
            }
        });
    },
    InsertUserTag: async function (taggedUsername, postId) {
        let data = {
            "taggedUsername": taggedUsername,
            "postId": postId
        }
        await genericRepo.executeProcedure(data, "InsertUserTag", (err, data) => {
            if (err) {
                //send response object with the err?
            }
            else {
             return data;//?also return object of response
            }
        });
    },
    InsertPost: async function (postData) {
        await genericRepo.executeProcedure(JSON.stringify(postData), "InsertPost", (err, data) => {
            if (err) {
                //send response object with the err?
            }
            else {
             return data;//?also return object of response
            }
        });
    }
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