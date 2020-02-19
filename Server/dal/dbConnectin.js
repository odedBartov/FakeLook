const mongoose = require('mongoose');

function ConnectToDB() {
    mongoose.connect(
        `mongodb+srv://mush22:mush22@reportsworkersdb-ei1sh.mongodb.net/test?retryWrites=true&w=majority`,
        { useNewUrlParser: true }).then().catch(err => console.log(err));
}

module.exports = ConnectToDB;


