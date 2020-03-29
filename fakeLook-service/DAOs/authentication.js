class authenticationDAO {
    elasticClient
    UUID
    constructor(elasticService, idCreator) {
        this.UUID = idCreator
        this.elasticClient = elasticService
    }

    CheckIfUserExist(userName, callback) {
        this.elasticClient.count({
            index: 'users',
            body: {
                query: {
                    term: {
                        'user_name': userName
                    }
                }
            }
        }, (err, res) => {
            if (err) {
                callback(err, undefined)
            } else {
                callback(undefined, res.count > 0)
            }
        })

        // const dbreq = this.dbPool.request()
        // dbreq.input('UserName', sql.NVarChar(50), userName)
        // dbreq.execute('SP_CheckUserName', (err, data) => {
        //     if (err) {
        //         callback(err, undefined)
        //     } else {
        //         callback(undefined, data.recordset[0])
        //     }
        // })
    }

    InsertUser(user, callback) {
        const generatedId = this.UUID.v4()       
        this.elasticClient.index({
            index: 'users',
            id: generatedId,
            body: {
                "user_id": generatedId,
                "user_name": user.userName,
                "password": user.password,
                "email": user.email,
                "join_field": "user"
            }
        }, (err, res) => {
            if (err) {
                callback(err, undefined)
            } else{                
                callback(undefined, res)
            }
        })
        // const dbreq = this.dbPool.request()
        // dbreq.input('UserName', sql.NVarChar(20), user.userName)
        // dbreq.input('Password', sql.NVarChar(60), user.password)
        // dbreq.input('email', sql.NVarChar(30), user.email)
        // dbreq.execute('SP_InsertUser', (err, data) => {
        //     if (err) {
        //         callback(err, undefined)
        //     } else {
        //         callback(undefined, data.recordset[0])
        //     }
        // })
    }

    GetPassword(userName, callback) {
        this.elasticClient.search({
            index: 'users',
            _source: ['password', 'user_id'],
            body: {
                query: {
                    term: {
                        'user_name': userName
                    }
                }
            }
        }, (err, res) => {
            if (err) {
                callback(err, undefined)
            } else {
                callback(undefined, res.hits.hits[0]._source)
            }
        })



        // const dbreq = this.dbPool.request()
        // dbreq.input('UserName', sql.NVarChar(15), userName)
        // dbreq.execute('SP_GetPassword', (err, data) => {
        //     if (err) {
        //         callback(err, undefined)
        //     } else {
        //         callback(undefined, data.recordset[0])
        //     }
        // })
    }
}

module.exports = authenticationDAO