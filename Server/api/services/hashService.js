var bcrypt = require('bcryptjs');

function HashPassword(password) {
    return bcrypt.hashSync(password, 8);
}

function ComparePasswords(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    HashPassword: HashPassword,
    ComparePasswords: ComparePasswords
}