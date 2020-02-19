const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mail: String,
    firstName: String,
    lastName: String,
    password: String,
    isConfirmed: Boolean,
    isManager: Boolean,
    phone: String,
    reports: [{
        time: Date,
        action: String,
        comment: String,
        location: [Number,Number]
    }]/*need create also schema for this embeded reports? */
});

module.exports = mongoose.model('User', userSchema);