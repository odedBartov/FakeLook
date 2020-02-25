const bcrypt = require('bcryptjs')

const bcryptService = {
    password: (user) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    return hash;
  },

   comparePassword: (pw, hash) => (
    bcrypt.compareSync(pw, hash)
  )
}

module.exports = bcryptService;