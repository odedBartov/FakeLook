const dbService = require('./DBService');
module.exports = {
    sendFriendRequest: function (req, res, next) {

    },

    acceptFriendRequest: function () {

    },
    //add friend to specific user
    addFriend: async function (req, res, next) {
        const friendUsername = req.body.friendUsername
        const userId = 1//?from token
        response = {}
        const friendId = await dbService.CheckIfUserExist(friendUsername)
        if (friendId) {
            const success = await dbService.InsertFreind(friendId, userId);
            if (success) {
                response = {
                    success: true,
                }
            }
            else {
                response = {
                    success: false,
                    errorMsg: "Users are already friends"
                }
            }
        }
        else {
            response = {
                success: false,
                errorMsg: "Username is not exist"
            }
        }
        res.status(200).json(response)
    },

    removeFriend: function () {

    },

    followFriend: function () {

    },

    createGroup: function () {

    },

    addFriendToGroup: function () {

    },
    //remove friend for specific user
    removeFriendFromGroup: async function (req, res, next) {
        let response = {}
        const friendUsername = req.params.friendUsername;
        const friendId = await dbService.CheckIfUserExist(friendUsername)
        if (friendId) {
            userId = 1//?token
            await dbService.removeFriend(friendId, userId).catch(err => console.log(err))
            response = {
                success: true
            }
        }
        else {
            response = {
                success: false,
                errorMsg: "Username is not exist"
            }
        }
        res.status(200).json(response)
    }
}
