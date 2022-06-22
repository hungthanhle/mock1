const passport = require('passport');
const ApiError = require('../utils/ApiError');
const allRoles = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(401, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const hasRequiredRights = allRoles[requiredRights];
    const userRights = hasRequiredRights.includes(user.role);
    if (!userRights && req.params.id !== user.user_id) {
      return reject(new ApiError(403, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
