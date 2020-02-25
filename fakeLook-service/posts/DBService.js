const sql = require('mssql')
const config = require('../credentials')




//need to change this connection to db of social!

const dbPool = new sql.ConnectionPool(config).
    connect().
    then(pool => pool).
    catch(err => console.log(err));


/* const services = {  } */
module.exports = {
    InsertImageTag: async function (title, postId) {
        var dbreq = (await dbPool).request();
        dbreq.input("title", title);
        dbreq.input("postId", postId);
        await dbreq.execute("SP_InsertImageTag").catch(err=>console.log(err))
    },

    InsertUserTag: async function (taggedUsername, postId) {
        var dbreq = (await dbPool).request();
        dbreq.input("taggedUsername ", taggedUsername);
        dbreq.input("postId", postId);
        await dbreq.execute("InsertUserTag").catch(err=>console.log(err))
    },

    InsertPost: async function (postData, userTags, imageTags) {
        var dbreq = (await dbPool).request();
        dbreq.input("postData", JSON.stringify(postData));
        dbreq.input("userTags", JSON.stringify(userTags));
        dbreq.input("imageTags",JSON.stringify(imageTags));
        await dbreq.execute("InsertPost3").catch(err=>console.log(err))
    }
}

