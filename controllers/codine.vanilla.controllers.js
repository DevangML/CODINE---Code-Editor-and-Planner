require('path');
const dotenv = require('dotenv');

dotenv.config();
const Pusher = require('pusher');
require('../databases/codine.dbs');
const logger = require('../logs/logger');

// Vanilla Controllers

const codineVanillaController = async (req, res) => {
  try {
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
      useTLS: true,
    });

    pusher.trigger('editor', 'code-update', {
      ...req.body,
    });

    await res.status(200).send('OK');
    logger.info('Pusher is working with vanilla web compiler');
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unepected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`,
    );
  }
};

module.exports = { codineVanillaController };
