const sql = require('mssql')

const config = require('../credentials')
const inputModel = require('../posts/models/inputModel');

//need to change this connection to db of social!

const dbPool = new sql.ConnectionPool(config).
    connect().
    then(pool => pool).
    catch(err => console.log(err));

module.exports = {
    //get inputs of procedure as array of inputModel
    //get name of procedure and callback function
    executeProcedure: async function (data, nameOfProcedure,callback) {
        var dbreq = (await dbPool).request();      
        dbreq.input("data",data);
        request.output('outputJson', sql.NVarChar(MAX));//?
        dbreq.execute(nameOfProcedure, (err, data) => {
            if (err) {
                callback(err, data)//?maybe write to log also
            } else {
                callback(undefined, data)//
            }
        })
    }
}