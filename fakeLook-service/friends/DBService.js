const sql = require('mssql')
const config = require('../credentials')

const dbPool = new sql.ConnectionPool(config).
    connect().
    then(pool => pool).
    catch(err => console.log(err));

module.exports = {
    InsertFreind: async function (usernameFreind, userId, callback) {
        var dbreq = (await dbPool).request();
        dbreq.input("usernameFreind", usernameFreind);
        dbreq.input("userId", userId);
        /*      dbreq.output('outputJson', sql.NVarChar);//? */
        await dbreq.execute("InsertFriend", (err, data) => {
            if (err) {
                callback(err,undefined);
            }
            else {
                callback(undefined,data);
            }
        })
    },
    CheckUserIsFriend(friendUsername,userId){
        var dbreq = (await dbPool).request();
        dbreq.input("usernameFreind", friendUsername);
        dbreq.input("userId", userId);
        /*      dbreq.output('outputJson', sql.NVarChar);//? */
        await dbreq.execute("CheckUserIsFriend", (err, data) => {
            if (err) {
                callback(err,undefined);
            }
            else {
                callback(undefined,data);
            }
        })  
    }
}