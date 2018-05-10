const bcrypt = require('bcrypt');
const Promise = require('promise');

const hashing = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(5, (errorSalt, salt) => {
    if (errorSalt) return reject(errorSalt);

    bcrypt.hash(password, salt, (errorHash, hash) => {
      if (errorHash) return reject(errorHash);

      resolve(hash);
    });
  });
});


const comparePassword = async (plainPassword, hashedPassword) => {
  const compare = await bcrypt.compare(plainPassword, hashedPassword);
  return compare;
};


module.exports = {
  hashing,
  comparePassword,
};

