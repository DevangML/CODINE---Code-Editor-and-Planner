// Token confirmation
const { OAuth2Client } = require('google-auth-library');
// const logger = require('../logs/logger');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('path');
require('dotenv').config({ path: '.env' });

const gAuth = async () => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  //logger.info('payload:', payload);

  // logger.info(`User ${payload.name} verified`);

  const { sub, email, name, picture } = payload;

  const userId = sub;

  /*
 const user = await db.user.upsert({ 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    })
    
    Use for syncing google data to localDB if google profile changes
  */

  console.table({ userId, email, name });

  return { userId, email, fullName: name, photoUrl: picture };
};

gAuth();

module.exports = gAuth;
