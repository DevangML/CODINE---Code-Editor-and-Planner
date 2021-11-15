const { oceContactModel } = require('../models/oce.models');
require('path');
require('../databases/oce.dbs');

// Contact Controllers

const oceContactPostController = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.message
  ) {
    res.send({ message: 'Content cannot be empty' });
    return;
  }

  const oceInstance = new oceContactModel({
    Name: req.body.name,
    Email: req.body.email,
    Phone: req.body.phone,
    Message: req.body.message,
  });

  try {
    const confirmation = await oceInstance.save();
    res.send(confirmation);
  } catch (err) {
    await res.send({ message: err });
  }
};

// Vanilla Controllers

const oceVanillaController = async (req, res) => {
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

  res.status(200).send('OK');
};

module.exports = {
  oceContactPostController,
  oceVanillaController,
};
