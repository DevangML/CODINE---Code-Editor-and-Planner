const crypto = require('crypto');
const logger = require('../logs/logger');

const secret1 = crypto.randomBytes(32).toString('hex');
const secret2 = crypto.randomBytes(32).toString('hex');

logger.info({ secret1, secret2 });
