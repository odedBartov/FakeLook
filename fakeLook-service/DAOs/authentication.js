class authenticationDAO {
    elasticClient
    UUID
    constructor(elasticService, idCreator) {
        this.UUID = idCreator
        this.elasticClient = elasticService
    }

    CheckIfUserExist(userName, callback) {
        this.elasticClient.count({
            index: "fake_look",
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
    }

    InsertUser(user, callback) {
        const generatedId = this.UUID.v4()
        this.elasticClient.index({
            index: "fake_look",
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
            } else {
                callback(undefined, res)
            }
        })
    }

    GetPassword(userName, callback) {
        this.elasticClient.search({
            index: "fake_look",
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
    }
}

module.exports = authenticationDAO