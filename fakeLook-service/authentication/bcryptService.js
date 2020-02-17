const bcrypt = require('bcryptjs')

module.exports = class BcryptService {
  password(user) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    return hash;
  }
  comparePassword(pw, hash) {
    return bcrypt.compareSync(pw, hash);
  }
}


// const bcryptService = () => {
//   const password = (user) => {
//     const salt = bcrypt.genSaltSync();
//     const hash = bcrypt.hashSync(user.password, salt);

//     return hash;
//   };

//   const comparePassword = (pw, hash) => (
//     bcrypt.compareSync(pw, hash)
//   );

//   return {
//     password,
//     comparePassword,
//   };
// };

// module.exports = bcryptService;