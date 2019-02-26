const { models } = require('../models').sequelize;
const { hashPassword, refreshToken } = require('../lib/authUtils');

const registerUser = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  if (!firstName || !lastName || !email || !password) {
    // TODO: add validation
    return res.status(400).send('Invalid');
  }
  // TODO: add password hashing
  const hashedPassword = hashPassword(req.body.password.toString());
  let createdUser;
  try {
    createdUser = await models.User.create(
      { ...req.body, password: hashedPassword },
      { fields: ['firstName', 'lastName', 'email', 'password'] },
    );
    return res.send(createdUser.get({ plain: true }));
  } catch (e) {
  // TODO: add error handling
    console.log(e);
    return res.status(500).send('err');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // TODO: add validation
    return res.status(400).send('Invalid');
  }
  const hashedPassword = hashPassword(password);
  let currentUser;
  try {
    currentUser = await models.User.findOne({
      where: { email, password: hashedPassword },
      attributes: ['id', 'email', 'firstName', 'lastName'],
    });
    if (!currentUser) return res.status(404).send('Not found');

    const userObj = {
      token: refreshToken(currentUser.email),
      id: currentUser.id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    };
    res.header('Authorization', userObj.token.toString());
    res.send(userObj);
  } catch (e) {
    // TODO: add validation
    return res.status(500).send('Error');
  }
};

const protectedRoute = (req, res) => res.send('yayyy');

module.exports = {
  registerUser,
  loginUser,
  protectedRoute,
};
