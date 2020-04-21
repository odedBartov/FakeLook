
class authenticationDAO {
    UUID
    fakeDB
    constructor(UsersDB, idCreator) {
        this.UUID = idCreator
        this.fakeDB = UsersDB
    }

    CheckIfUserExist (userName, callback) {
        callback(undefined, this.fakeDB.getUserByName(userName)? true : false)
    }


    InsertUser (user, callback) {
        this.fakeDB.createUser(user)
        callback(undefined, user)
    }

    GetPassword (userName, callback) {
        const foundUser = this.fakeDB.getPassword(userName)
        callback(undefined, foundUser? foundUser : {GetPassword: ""})
    }
}

module.exports = authenticationDAO 