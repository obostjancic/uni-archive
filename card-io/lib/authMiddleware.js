const { isProtectedRoute, validateAndRefreshToken } = require('./authUtils');

const checkAuth = () => (req, res, next) => {
  // if its a public path, just call next
  if (!isProtectedRoute(req.path)) return next();
  // check for authorization header
  if (!req.get('Authorization')) {
    res.status(401).send({
      status: 'Required login!',
    });
    return;
  }

  const authToken = req.get('Authorization');
  // let userObj = await validateAndRefreshToken(authToken)
  validateAndRefreshToken(authToken)
    .then((userObj) => {
      if (!userObj || !userObj.token || !userObj.email || !userObj.id) throw new Error('invalid token');
      res.header('Authorization', userObj.token.toString());
      req.user = userObj;
      return next();
    })
    .catch((e) => {
      // TODO: add error handling
      console.log(e);
      res.status(401).send({
        status: 'Required login!',
      });
    });
};

module.exports = checkAuth;

