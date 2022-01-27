const axios = require('axios');

class Student {
  constructor() {}

  home(type) {
    let data = this.getInfo(type, 1);
    return data;
  }

  userId() {
    return 12;
  }

  getInfo(type, status) {
    return type, status;
  }

  finalMarks(total) {
    let external = this.getExternal(total);
    let internal = this.getInternal(total);
    let finalSum = external + internal + 10;

    return finalSum;
  }

  getExternal(total) {
    return total + 1;
  }

  getInternal(total) {
    return total - 1;
  }

  dbData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(10), 1000);
    });
  }

  thirdPartApi() {
    return new Promise((resolve, reject) => {
      axios
        .get('http://localhost/api/article-list')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = Student;
