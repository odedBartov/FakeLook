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
            index: "fake_look",
            _source: ['post_id', 'image_url', 'location'],
            body: {
                "query": {
                    "term": {
                        "join_field": "post"
                    }
                }
            }
        }, (err, res) => {
            handleElasticResponses(err, res.hits.hits.map(p => p._source), callback)
        })
    }

    getPost = (postId, callback) => {
        this.elasticSearch.search({
            index: "fake_look",
            body: {
                query: {
                    term: {
                        'post_id': postId
                    }
                }
            }
        }, (err, res) => {
            handleElasticResponses(err, res.hits.hits[0]._source, callback)
        })
    }

    publishPost = (post, callback) => {
        const generatedId = this.UUID.v4()
        this.elasticSearch.index({
            index: "fake_look",
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
                "likes": [],
                "comments": [],
                "join_field": {
                    "name": "post",
                    "parent": post.publisherId
                }
            }
        }, (err, data) => {
            handleElasticResponses(err, data, callback)
        })
    }

    likepost = (postId, userId, callback) => {
        this.elasticSearch.update({
            index: "fake_look",
            id: postId,
            body: {
                "script": {
                    "source": "ctx._source.likes.add(params.user)",
                    "params": {
                        "user": userId
                    }
                }
            }
        }, (err, res) => {
            handleElasticResponses(err, res, callback)
        })
    }

    dislikePost = (postId, userId, callback) => {
        this.elasticSearch.update({
            index: "fake_look",
            id: postId,
            body: {
                "script": {
                    "inline": "ctx._source.likes.remove(ctx._source.likes.indexOf(params.user))",
                    "params": {
                        "user": userId
                    }
                }
            }
        }, (err, res) => {
            handleElasticResponses(err, res, callback)
        })
    }

    checkIfLikedPost = (postId, callback) => {
        this.elasticSearch.search({
            index: "fake_look",
            _source: 'likes',
            body: {
                query: {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "join_field": "post"
                                }
                            },
                            {
                                "term": {
                                    "post_id": postId
                                }
                            }
                        ]
                    }
                }
            }
        }, (err, res) => {
            handleElasticResponses(err, res.hits.hits[0]._source.likes, callback)
        })
    }

    CheckIfUsernamesExist = async (usernames, callback) => {
        var wrongUsers = []
        var promises = usernames.map(async (tag) => {
            var user = await this.elasticSearch.search({
                index: "fake_look",
                _source: "user_name",
                body: {
                    "query": {
                        "bool": {
                            "must": [
                                {
                                    "term": {
                                        "join_field": "user"
                                    }
                                },
                                {
                                    "term": {
                                        "user_name": tag
                                    }
                                }
                            ]
                        }
                    }
                }
            })
            if (user.hits.hits.length == 0) {
                wrongUsers.push(tag)
            }
        })
        try {
            await Promise.all(promises)
        } catch (err) {
            callback(err, undefined)
        }
        callback(undefined, wrongUsers)
    }

    publishComment = (comment, callback) => {
        const generatedId = this.UUID.v4()
        this.elasticSearch.update({
            index: "fake_look",
            id: comment.postId,
            body: {
                "script": {
                    "source": "ctx._source.comments.add(['comment_id': params.comment_id, 'comment_text': params.comment_text, 'comment_publisher': params.comment_publisher, 'comment_publish_date': params.comment_publish_date])",
                    "params": {
                        "comment_id": generatedId,
                        "comment_text": comment.comment_text,
                        "comment_publisher": comment.comment_publisher,
                        "comment_publish_date": comment.comment_publish_date
                    }
                }
            }
        }, (err, res) => {
            handleElasticResponses(err, res, callback)
        })
        // var dbreq = this.dbPool.request()
        // dbreq.input('postId', sql.BigInt, comment.postId)
        // dbreq.input('userId', sql.BigInt, comment.userId)
        // dbreq.input('text', sql.NVarChar(200), comment.text)
        // dbreq.input('date', sql.Date, comment.date)
        // dbreq.execute('SP_PublishComment', (err, data) => {
        //     handleDbResponses(err, data, callback)
        // })
    }

    // insertTags = (tags, callback) => {
    //     var dbreq = this.dbPool.request()
    //     dbreq.input('tags', JSON.stringify(tags))
    //     dbreq.execute('SP_InsertImageTags', (error, data) => {
    //         if (error) {
    //             callback(error, undefined)
    //         }
    //         else {
    //             callback(undefined, data)
    //         }
    //     })
    // }
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