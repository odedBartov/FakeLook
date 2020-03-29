const sql = require('mssql')

class postsDAO {
    dbPool
    elasticSearch
    UUID
    constructor(socialConfig, elasticSearchClient, idCreator) {
        this.elasticSearch = elasticSearchClient
        this.UUID = idCreator
        this.dbPool = new sql.ConnectionPool(socialConfig, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('connected to DB from posts!')
            }
        })
    }

    getPosts = (filter, callback) => {
        this.elasticSearch.search({
            index: 'users',
            _source: ['post_id', 'image_url', 'location'],
            body: {
                "query": {
                    "term": {
                        "join_field": "post"
                    }
                }
            }
        }, (err, res) => {
            // if (err) {
            //     callback(err, undefined)
            // } else {
            //     callback(undefined, res.hits.hits.map(p => p._source))
            // }
            handleElasticResponses(err, res.hits.hits.map(p => p._source), callback)
        })

        // var dbreq = this.dbPool.request()
        // dbreq.input('dateFrom', sql.Date, filter.data.dateFrom)
        // dbreq.input('dateTo', sql.Date, filter.data.dateTo)
        // dbreq.input('radius', sql.Float, filter.data.radius)
        // dbreq.input('currentLongitude', sql.Float, filter.data.longitude)
        // dbreq.input('currentLatitude', sql.Float, filter.data.latitude)
        // dbreq.input('users', JSON.stringify(filter.taggedUsers))
        // dbreq.input('imageTags', JSON.stringify(filter.imageTags))

        // dbreq.execute('SP_GetPosts', (err, data) => {
        //     handleDbResponses(err, data, callback)
        // })
    }

    getPost = (postId, callback) => {
        var dbreq = this.dbPool.request()
        dbreq.input('postId', sql.BigInt, postId)
        dbreq.execute('SP_GetPost', (err, data) => {
            handleDbResponses(err, data, callback)
        })
    }

    insertPost = (post, callback) => {
        const generatedId = this.UUID.v4()
        this.elasticSearch.index({
            index: 'users',
            id: generatedId,
            routing: post.publisherId,
            body: {
                "post_id": generatedId,
                "post_text": post.text,
                "post_publish_date": post.publishedDate,
                "image_url": post.image_url,
                "location": post.location,
                "user_tags": post.user_tags.split(','),
                "image_tags": post.image_tags.split(','),
                "join_field": {
                    "name": "post",
                    "parent": post.publisherId
                }
            }
        }, (err, data) => {
            handleElasticResponses(err, data, callback)
        })


        // var dbreq = this.dbPool.request()
        // dbreq.input('postData', JSON.stringify(post.data))
        // dbreq.input('taggedUsers', JSON.stringify(post.taggedUsers))
        // dbreq.input('imageTags', JSON.stringify(post.imageTags))
        // dbreq.execute('SP_InsertPost', (err, data) => {
        //     handleDbResponses(err, data, callback)
        // })
    }

    likepost = (postId, userId, callback) => {
        var dbreq = this.dbPool.request()
        dbreq.input('postId', sql.BigInt, postId)
        dbreq.input('userId', sql.BigInt, userId)
        dbreq.execute('SP_LikePost', (err, data) => {
            handleDbResponses(err, data, callback)
        })
    }

    dislikePost = (postId, userId, callback) => {
        var dbreq = this.dbPool.request()
        dbreq.input('postId', sql.BigInt, postId)
        dbreq.input('userId', sql.BigInt, userId)
        dbreq.execute('SP_DisLikePost', (err, data) => {
            handleDbResponses(err, data, callback)
        })
    }

    checkIfLikedPost = (postId, userId, callback) => {
        var dbreq = this.dbPool.request()
        dbreq.input('postId', sql.BigInt, postId)
        dbreq.input('userId', sql.BigInt, userId)
        dbreq.execute('SP_CheckIfUserLikedPost', (err, data) => {
            handleDbResponses(err, data, callback)
        })
    }

    CheckIfUsernamesExist = (usernames, callback) => {
        var dbreq = this.dbPool.request()
        dbreq.input('usernames', JSON.stringify(usernames))
        dbreq.execute('SP_CheckIfUsernamesExist', (err, data) => {
            handleDbResponses(err, data, callback)
        })
    }

    // createUser = (user, callback) => {
    //     var dbreq = this.dbPool.request()
    //     dbreq.input('userId', sql.BigInt, user.createdUserId)
    //     dbreq.input('userName', sql.NVarChar(20), user.userName)
    //     dbreq.input('email', sql.NVarChar(30), user.email)
    //     dbreq.execute('SP_InsertUser', (err, data) => {
    //         handleDbResponses(err, data, callback)
    //     })
    // }

    publishComment = (comment, callback) => {
        var dbreq = this.dbPool.request()
        dbreq.input('postId', sql.BigInt, comment.postId)
        dbreq.input('userId', sql.BigInt, comment.userId)
        dbreq.input('text', sql.NVarChar(200), comment.text)
        dbreq.input('date', sql.Date, comment.date)
        dbreq.execute('SP_PublishComment', (err, data) => {
            handleDbResponses(err, data, callback)
        })
    }

    insertTags = (tags, callback) => {
        var dbreq = this.dbPool.request()
        dbreq.input('tags', JSON.stringify(tags))
        dbreq.execute('SP_InsertImageTags', (error, data) => {
            if (error) {
                callback(error, undefined)
            }
            else {
                callback(undefined, data)
            }
        })
    }
}
handleDbResponses = (err, data, callback) => {
    if (err) {
        callback(err, undefined)
    } else {
        callback(undefined, data.recordset)
    }
}

handleElasticResponses = (err, data, callback) => {
    if (err) {
        callback(err, undefined)
    } else {
        callback(undefined, data)
    }
}

module.exports = postsDAO