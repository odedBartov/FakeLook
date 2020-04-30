
class postsDAO {
    postsIndex = "fake_look"
    currentDAO = "social DAO"
    logger
    elasticSearch
    UUID
    constructor(elasticSearchClient, idCreator, _logger) {
        this.elasticSearch = elasticSearchClient
        this.UUID = idCreator
        this.logger = _logger
    }

    getfilterByDates(dateFrom, dateTo) {
        if (dateFrom)
            dateFrom = dateFrom.toString().replace(/-/g, "/")
        if (dateTo)
            dateTo = dateTo.toString().replace(/-/g, "/")

        let filter =
        {
            "range": {
                "post_publish_date": {
                    "gte": dateFrom,
                    "lt": dateTo
                }
            }
        }
        return filter
    }

    getfilterByRadius(radius, latitude, longitude) {
        let filter =
        {
            "geo_distance": {
                "distance": `${radius}km`,
                "location": {
                    "lat": latitude,
                    "lon": longitude
                }
            }
        }
        return filter
    }

    getFilterByImageTags(imagesTags, filteres) {
        imagesTags.map(tag => filteres.push({
            "term": {
                "image_tags": tag.imageTag
            }
        }))
    }

    getFilterByUserTags(userTags, filteres) {
        userTags.map(tag => filteres.push({
            "term": {
                "user_tags": tag.UN
            }
        }))
    }

    generateAllFilters(filter) {
        let dateFrom = filter.data.dateFrom
        let dateTo = filter.data.dateTo
        let radius = filter.data.radius
        let longitude = filter.data.longitude
        let latitude = filter.data.latitude
        let imageTags = filter.imageTags
        let taggedUsers = filter.taggedUsers
        let filteres = [{
            "match": {
                "join_field": "post"
            }
        }]

        if (dateFrom || dateTo)
            filteres.push(this.getfilterByDates(dateFrom, dateTo))
        if (radius)
            filteres.push(this.getfilterByRadius(radius, latitude, longitude))
        if (imageTags)
            this.getFilterByImageTags(imageTags, filteres)
        if (taggedUsers)
            this.getFilterByUserTags(taggedUsers, filteres)
        return filteres
    }

    getAmountOfPosts(callback) {
        this.logger.writeInfo(this.currentDAO, "getAmountOfPosts", "a request to the db to get the amount of the posts")
        this.elasticSearch.count({
            index: this.postsIndex,
            body: {
                query: {
                    term: {
                        'join_field': "post"
                    }
                }
            }
        }, (err, res) => {
            handleElasticResponses(err, res.count, callback)
        })
    }

    getPosts = (filter, callback) => {
        this.logger.writeInfo(this.currentDAO, "getPosts", "a request to the db to get posts with filters: " + JSON.stringify(filter))
        let filteres = this.generateAllFilters(filter)
        let searchJson = {
            index: this.postsIndex,
            _source: ['post_id', 'image_url', 'location', 'post_text'],
            body: {
                "query": {
                    "bool": {
                        "must": filteres
                    }
                },
                "sort": [
                    {
                        "post_publish_date": {
                            "order": "desc"
                        }
                    }
                ]
            }
        }
        if (filter.from != -1) {
            searchJson.from = filter.from
            searchJson.size = 10
        }
        else {
            searchJson.size = 20
        }

        this.elasticSearch.search(searchJson, (err, res) => {
            handleElasticResponses(err, res.hits? res.hits.hits.map(p => p._source) : res, callback)
        })
    }

    getPost = (postId, callback) => {
        this.logger.writeInfo(this.currentDAO, "postId", "a request to the db to get a specific post with id: " + postId)
        this.elasticSearch.search({
            index: this.postsIndex,
            body: {
                query: {
                    term: {
                        'post_id': postId
                    }
                }
            }
        }, (err, res) => {
            handleElasticResponses(err, res.hits.hits[0] ? res.hits.hits[0]._source : undefined, callback)
        })
    }

    publishPost = (post, callback) => {
        this.logger.writeInfo(this.currentDAO, "publishPost", "a request to the db to publish new post: " + post)
        const generatedId = this.UUID.v4()
        this.elasticSearch.index({
            index: this.postsIndex,
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
        this.logger.writeInfo(this.currentDAO, "likepost", `a request to the db to like a post with postId: ${postId} and userId: ${userId}`)
        this.elasticSearch.update({
            index: this.postsIndex,
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
        this.logger.writeInfo(this.currentDAO, "dislikepost", `a request to the db to dislike a post with postId: ${postId} and userId: ${userId}`)
        this.elasticSearch.update({
            index: this.postsIndex,
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
        this.logger.writeInfo(this.currentDAO, "checkIfLikedPost", `a request to the db to get all likes of post with postId: ${postId}`)
        this.elasticSearch.search({
            index: this.postsIndex,
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
        this.logger.writeInfo(this.currentDAO, "CheckIfUsernamesExist", `a request to the db to get check if recieved userNames exists: ${usernames}`)
        var wrongUsers = []
        var promises = usernames.map(async (tag) => {
            var user = await this.elasticSearch.search({
                index: this.postsIndex,
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
        this.logger.writeInfo(this.currentDAO, "publishComment", `a request to the db to publish a comment: ${comment}`)

        const generatedId = this.UUID.v4()
        this.elasticSearch.update({
            index: this.postsIndex,
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
            handleElasticResponses(err, { commentId: generatedId }, callback)
        })
    }

    createUser = (user, callback) => {
        this.logger.writeInfo(this.currentDAO, "createUser", `a request to the db to create a user: ${user}`)
        this.elasticSearch.index({
            index: this.postsIndex,
            id: user.ID,
            body: {
                "user_id": user.ID,
                "user_name": user.userName,
                "password": user.password,
                "email": user.email,
                "join_field": "user"
            }
        }, (err) => {
            callback(err)
        })
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