const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const DefaultError = require('./defaultError');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
    const token = authorization?.includes('Bearer ') ? authorization.split(' ')?.[1] : null;

  if (!token) {
    throw new DefaultError(401, 'Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET );
    req.user = payload;
    next();
  } catch (err) {
    throw new DefaultError(401, 'Необходима авторизация');
  }
};
