class UsersDB{
    constructor(){ }

    users = []

    createUser(user){
        this.users.push(user)
    }

    getUserByName(userName){
        return this.users.find(u => u.userName == userName)
    }

    getPassword(userName){
        return this.users.find(u => u.userName == userName)
    }
}

module.exports = UsersDB 