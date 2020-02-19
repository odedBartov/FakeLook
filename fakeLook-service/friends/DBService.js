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
        let response;
        /*      dbreq.output('outputJson', sql.NVarChar);//? */
        await dbreq.execute("InsertFriend", (err, data) => {
            if (err) {
                result.success = false;
                if (err.number == "2627") {
                    response.err = "This friend is exist for requested user";
                    response.status = 400;
                    callback(err);
                }
                else if (err.number == "515") {
                    response.err = "This username of friend is not exist";
                    response.status = 400;
                    callback(err);
                }
                else {
                    console.log(err);//?log another errors of connection and more
                }
            } else {
                response.status = 201;
                callback(undefined);
            }
        })


    }
}