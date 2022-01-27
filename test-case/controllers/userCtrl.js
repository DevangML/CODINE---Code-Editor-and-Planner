const { response } = require('express');

const userList = (req, res) => {
  let data = {
    list: 'hello',
  };

  response.status(200).json({ statusTest: 'success', data });
};

const newsData = () => {
  return new Promise((resolve, reject) => {
    resolve({ otp: 9000 });
  });
};

module.exports = { userList, newsData };
