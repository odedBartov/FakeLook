const express = require('express')

const router = express.Router();
const friendsAPI = require('./friendsAPI')


router.post('/sendFriendRequest', friendsAPI.sendFriendRequest)

router.post('/acceptFriendRequest', friendsAPI.acceptFriendRequest)

router.post('/addFriend',friendsAPI.addFriend)

router.delete('/removeFriend/:friendId', friendsAPI.removeFriend)

router.post('/followFriend', friendsAPI.followFriend)

router.post('/createGroup', friendsAPI.createGroup)

router.post('/addFriendToGroup', friendsAPI.addFriendToGroup)

router.post('/removeFriendFromGroup', friendsAPI.removeFriendFromGroup)

router.get('/getFriends', friendsAPI.getFriends)

module.exports = router