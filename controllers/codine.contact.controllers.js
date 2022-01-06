require('path');
const dotenv = require('dotenv');

dotenv.config();
require('../databases/codine.dbs');
const logger = require('../logs/logger');
const { CodineContactModel } = require('../models/codine.contact.models');

// Contact Controllers

const codineContactCreateController = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.message) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return await res.status(400).json({
        error: 'Insufficient inputs',
      });
    }

    const { authType } = req.body;
    let userId;
    if (authType === 'Google') {
      userId = req.user.sub;
    } else if (authType === 'jwtAuth') {
      userId = req.user.id;
    }

    const codineInstance = new CodineContactModel({
      userId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    });

    const confirmation = await codineInstance.save();
    res.send(confirmation);
    logger.info('Form Submission Successful');
  } catch (err) {
    await res.status(500).json({ error: err, errorInfo: 'Unexpected Error' });
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};

module.exports = { codineContactCreateController };
