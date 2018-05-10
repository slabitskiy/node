const { User } = require('../modules');
const crypt = require('./crypt');

function strategy(email, password, done) {
  (async function () {
    try {
      const user = await User.findByEmail(email, true);

      if (!user) return done(null, false, { message: 'Unknown user' });

      const isMatch = await crypt.comparePassword(password, user.password);

      if (isMatch) {
        return done(null, user);
      }

      done(null, false, { message: 'Invalid password' });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }());
}

const serialize = (user, done) => {
  done(null, user.email);
};

const deserialize = async (email, done) => {
  try {
    const user = await User.findByEmail(email);

    done(null, user);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  strategy,
  serialize,
  deserialize,
};

