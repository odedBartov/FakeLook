const dbService = require('./DBService');
module.exports = {
    sendFriendRequest: function (req, res, next) {

    },

    acceptFriendRequest: function () {

    },
    //add friend to specific user
    addFriend: async function (req, res, next) {
        const friendUsername = req.body.friendUsername
        const userId = req.user.id;
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
    //?
    removeFriend: async function (req, res, next) {
        /*         const userId = req.user.id */
        let response = {
            success: true
        }
        const userId = 1;
        const friendId = req.params.friendId
        await dbService.removeFriend(friendId, userId).catch(err => {
            response.success = false
            console.log(err)
        })
        res.status(200).json(response)
    },
    getFriends: async function (req, res, next) {
        /*  const userId = req.user.id; */
        const userId = 1;
        const friends = await dbService.getFriends(userId).catch(err => console.log(err))
        res.status(200).json(friends);
    },

    followFriend: function () {

    },

    createGroup: function () {

    },

    addFriendToGroup: function () {

    },
    //remove friend for specific user
    removeFriendFromGroup: async function (req, res, next) {

    }
}
