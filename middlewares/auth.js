const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('path');
const dotenv = require('dotenv');
const logger = require('../logs/logger');

dotenv.config();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.header('token');
    const authType = req.header('authType');
    if (authType === 'Google') {
      await client
        .verifyIdToken({
          idToken: token,
          requiredAudience: client,
        })
        .then((result) => {
          const payload = result.getPayload();
          if (!payload.email) {
            logger.error(
              `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
            );
            return res.status(400).json({
              error: 'Google User cannot be authorized',
            });
          }
          req.user = payload;

          logger.info(`${req.user}`);

          next();
        });
      return null;
    } else if (authType === 'jwtAuth') {
      // Get token from header
      // Check if there is no token in the header
      if (!token) {
        logger.error(
          `401 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }

      // Verify token

      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } else {
      logger.info('User not logged in');
      return res.status(400).send('User not logged in');
    }
  } catch (err) {
    await res.status(500).send('Server error');
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

module.exports = auth;
