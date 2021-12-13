// Token confirmation
const { OAuth2Client } = require('google-auth-library');
const logger = require('../logs/logger');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('path');
require('dotenv').config({ path: '.env' });

const gAuth = async (req, res, next) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      requiredAudience: client,
    });
    const payload = ticket.getPayload();

    if (!payload.email) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({
        error: 'Google User cannot be authorized',
      });
    }

    next();
  } catch (err) {
    await res.status(500).send('Server error');
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

module.exports = gAuth;
