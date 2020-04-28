
class postsDAO {
    postsIndex = "fake_look"
    fakeLookDB
    UUID
    constructor(fakeDB, idCreator) {
        this.fakeLookDB = fakeDB
        this.UUID = idCreator
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


    getAmountOfPosts = (callback) => {
        callback(undefined, this.fakeLookDB.getPosts().length)
    }

    getPosts = (filter, callback) => {
        //let filteres = this.generateAllFilters(filter)
        callback(undefined, this.fakeLookDB.getPosts())
    }

    getPost = (postId, callback) => {
        callback(undefined, this.fakeLookDB.getPost(postId))
    }

    publishPost = (post, callback) => {
        this.fakeLookDB.getPosts().push(post)
        callback(undefined, { _id: post.id })
    }

    likepost = (postId, userId, callback) => {
        this.fakeLookDB.likePost(postId, userId)
        callback()
    }

    dislikePost = (postId, userId, callback) => {
        this.fakeLookDB.dislikePost(postId, userId)
        callback()
    }

    checkIfLikedPost = (postId, callback) => {
        callback(undefined, this.fakeLookDB.getLikes(postId))
    }

    CheckIfUsernamesExist = async (usernames, callback) => {
        const users = this.fakeLookDB.getUsers()
        let worngUsers = []


        usernames.forEach(username => {
            if (!users.find(user => user.username == username))
                worngUsers.push(username)
        });
        callback(undefined, worngUsers)
        // var wrongUsers = []
        // var promises = usernames.map(async (tag) => {
        //     var user = await this.elasticSearch.search({
        //         index: this.postsIndex,
        //         _source: "user_name",
        //         body: {
        //             "query": {
        //                 "bool": {
        //                     "must": [
        //                         {
        //                             "term": {
        //                                 "join_field": "user"
        //                             }
        //                         },
        //                         {
        //                             "term": {
        //                                 "user_name": tag
        //                             }
        //                         }
        //                     ]
        //                 }
        //             }
        //         }
        //     })
        //     if (user.hits.hits.length == 0) {
        //         wrongUsers.push(tag)
        //     }
        // })
        // try {
        //     await Promise.all(promises)
        // } catch (err) {
        //     callback(err, undefined)
        // }
        // callback(undefined, wrongUsers)
    }

    publishComment = (comment, callback) => {
        this.fakeLookDB.publishComment(comment, comment.postId)
        callback(undefined)
        // this.elasticSearch.update({
        //     index: this.postsIndex,
        //     id: comment.postId,
        //     body: {
        //         "script": {
        //             "source": "ctx._source.comments.add(['comment_id': params.comment_id, 'comment_text': params.comment_text, 'comment_publisher': params.comment_publisher, 'comment_publish_date': params.comment_publish_date])",
        //             "params": {
        //                 "comment_id": generatedId,
        //                 "comment_text": comment.comment_text,
        //                 "comment_publisher": comment.comment_publisher,
        //                 "comment_publish_date": comment.comment_publish_date
        //             }
        //         }
        //     }
        // }, (err, res) => {
        //     handleElasticResponses(err, { commentId: generatedId }, callback)
        // })
    }

    createUser = (user, callback) => {
        this.fakeLookDB.createUser(user)
        callback(undefined)
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