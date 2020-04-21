const bcrypt = require('bcryptjs')

const bcryptService = {
    createPassword: (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  },

   comparePassword: (password, hash) => (
    bcrypt.compareSync(password, hash)
  )
}

module.exports = bcryptService;