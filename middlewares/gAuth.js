// Token confirmation
const { OAuth2Client } = require('google-auth-library');
const logger = require('../logs/logger');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const path = require('path');
require('dotenv').config({ path: '.env' });

const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  //logger.info('payload:', payload);

  logger.info(`User ${payload.name} verified`);

  const { sub, email, name, picture } = payload;
  const userId = sub;
  return { userId, email, fullName: name, photoUrl: picture };
};

module.exports = gAuth;
