const jwt = require('jsonwebtoken');
const logger = require('../logs/logger');
require('path');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there is no token in the header
  if (!token) {
    logger.error(`401 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return await res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
    logger.info('User Authorized');
  } catch (err) {
    logger.error(`401 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    await res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
