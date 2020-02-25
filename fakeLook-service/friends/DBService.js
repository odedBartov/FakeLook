const sql = require('mssql')
const config = require('../credentials')

const dbPool = new sql.ConnectionPool(config).
    connect().
    then(pool => pool).
    catch(err => console.log(err));

module.exports = {
    InsertFreind: async function (friendId, userId) {
        var dbreq = (await dbPool).request();
        dbreq.input("friendId", friendId);
        dbreq.input("userId", userId);
        dbreq.output("success", sql.Bit);
        /*      dbreq.output('outputJson', sql.NVarChar);//? */
        const result = await dbreq.execute("InsertFriend").catch(err => console.log(err))
        return result.output.success
    },

    CheckUserIsFriend: async function (friendId, userId) {
        var dbreq = (await dbPool).request();
        dbreq.input("friendId", friendId);
        dbreq.input("userId", userId);
        /*      dbreq.output('outputJson', sql.NVarChar);//? */
        const result = await dbreq.execute("CheckUserIsFriend").catch(err => console.log(err))
        return result.rescordsets[0][0]
    },

    CheckIfUserExist: async function (username) {
        var dbreq = (await dbPool).request();
        dbreq.input("username", username);
        dbreq.output("userId", sql.BigInt)
        const result = await dbreq.execute("IsUserExist").catch(err => console.log(err))
        return result.output.userId
    },
    removeFriend: async function (friendId, userId) {
        var dbreq = (await dbPool).request()
        dbreq.input("friendId", friendId)
        dbreq.input("userId", userId)
        await dbreq.execute("RemoveFriend").catch(err => console.log(err))
    },
    getFriends: async function (userId) {
        var dbreq = (await dbPool).request()
        dbreq.input("userId", userId)
        const result = await dbreq.execute("GetFriends").catch(err => console.log(err))
        const friends = result.recordsets[0]
        return friends;
    }
}