const dbService = require('./DBService')


module.exports = {
    sendFriendRequest: function (req, res, next) {

    },

    acceptFriendRequest: function () {

    },
    addFriend: async function (req, res, next) {
        const friendUsername = req.body.friendUsername
        console.log(req.body)
        const userId = 1//?from token
        response = {}
        const friendId = await dbService.CheckIfUserExist(friendUsername)
        if (friendId) {
            const success = await dbService.InsertFreind(friendId, userId);
            if (success) {
                response.status = 201
                response.json = {
                    success: true,
                }
            }
            else {
                response.status = 401
                response.json = {
                    success: false,
                    errorMsg: "Users are already friends"
                }
            }
        }
        else {
            response.status = 401
            response.json = {
                success: false,
                errorMsg: "Username of friend is not exist"
            }
        }
        res.status(response.status).json(response.json)
    },

    removeFriend: function () {

    },

    followFriend: function () {

    },

    createGroup: function () {

    },

    addFriendToGroup: function () {

    },

    removeFriendFromGroup: function () {

    }
}
