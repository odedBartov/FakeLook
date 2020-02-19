const mongoose = require('mongoose');
const User = require('../../api/models/user');

async function AddUser(user) {
    res = {};
    await user.save()
        .then(result => {
            res.status = 200;
            res.resJson = {
                result: true
            };
        })
        .catch(err => {
            console.log(err);
            res.status = 500;
            res.resJson = {
                result: false,
                errorCode: 347,
                errorDesc: "Failure To Create User"
            };
        });
    return res;
}

async function FindByMail(mail) {
    res = await User.findOne({ mail: mail });
    return res;
}
async function FindByName(firstName, lastName) {
    res = await User.findOne({ firstName: firstName, lastName: lastName });
    return res;
}

async function findOne(query) {
    res = await User.findOne(query);
    return res;
}

//update the field IsConfirmed to true, so the account is been activated
async function UpdateConfirmation(mail) {
    try {
        await User.updateOne(
            { mail: mail },
            { "$set": { "isConfirmed": true } }
        );
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    AddUser: AddUser,
    FindByMail: FindByMail,
    findOne: findOne,
    FindByName: FindByName,
    UpdateConfirmation:UpdateConfirmation
}