const User = require('../models/user');
const mongoose = require('mongoose');
var hashServ = require('./hashService');


function CreateUser(body, isManager) {
    //hash password
    body.password = hashServ.HashPassword(body.password);

    //create user by schema of mongodb
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        mail: body.mail,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
        phone: body.phone,
        isConfirmed: false,
        isManager : isManager
    });

    return user;

}

function CreateReport(data) {
    //create from body report object
    data.time = Date.now();
    return data;
}

module.exports = {
    CreateReport: CreateReport,
    CreateUser: CreateUser
}