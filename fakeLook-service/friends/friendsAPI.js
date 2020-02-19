const dbServiceFriends = require('./DBService')
const authDBService= require('../authentication/DBService')



module.exports = {
    sendFriendRequest: function (req, res, next) {

    },

    acceptFriendRequest: function () {

    },
    addFriend: async function (req, res, next) {
        //recrypt token and get userId
        let userId = req.body.token;//?

        //check if username exist 
        await 
        await dbService.InsertFreind(req.body.usernameFriend, userId, (response) => {
            res.status(response.status).json(response.err);
        });
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
