const crypto = require('crypto');
const moment = require('moment');

const models = require('../models');
// FIXME: move to env variables
const SECRET = 't4jN451fr4';
const ALGORITHM = 'aes192';
const ENCODING = 'hex';
const UTF8 = 'utf8';


const PROTECTED_ROUTES = ['/api/protected'];
const isProtectedRoute = route => !!PROTECTED_ROUTES.find(r => r === route);
const timestampIsExpired = timestamp => !moment(timestamp).isAfter(Date.now());
const extendedTimestamp = () => moment().add(1, 'days').format('YYYY-MM-DD HH:mm');

const createCiphered = (message) => {
  const cipher = crypto.createCipher(ALGORITHM, SECRET);
  let ciphered = cipher.update(message, UTF8, ENCODING);
  ciphered += cipher.final(ENCODING);
  return ciphered;
};
// FIXME: throws type error for invalid tokens!
const createDeciphered = (cryptedMessage) => {
  const decipher = crypto.createDecipher(ALGORITHM, SECRET);
  let deciphered = decipher.update(cryptedMessage, ENCODING, UTF8);
  deciphered += decipher.final(UTF8);
  return deciphered;
};

const refreshToken = email => createCiphered(JSON.stringify({
  email,
  timestamp: extendedTimestamp(),
}));

const hashPassword = (password) => {
  const hash = crypto.createHmac('sha512', SECRET);
  hash.update(password);
  return hash.digest(ENCODING);
};

// for a given encrypted token, check it is not expired and if it is valid
const validateAndRefreshToken = async (token) => {
  try {
    const { email, timestamp } = JSON.parse(createDeciphered(token));
    if (!email || !timestamp) return null;
    if (timestampIsExpired(timestamp)) return null;
    const user = await models.User.findOne({
      where: { email },
      attributes: ['id', 'email'],
      raw: true,
    });
    if (!user || !user.email || !user.id) return null;
    // everything checks out, return the refreshToken with username and id
    const userObj = {
      token: refreshToken(email),
      email,
      id: user.id,
    };
    return userObj;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

module.exports = {
  validateAndRefreshToken,
  hashPassword,
  isProtectedRoute,
  refreshToken,
};
