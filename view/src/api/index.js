import axios from 'axios';

/*eslint-disable*/

const API = axios.create({ baseURL: 'api' });

export const compilerPost = () =>
  API.post('/compiler/runCode', { language, code, input }).then((res) => {
    if (res.data.memory && res.data.cpuTime) {
      setOutputLogs('');
      setOutputLogs(
        `Memory Used: ${res.data.memory} \nCPU Time: ${res.data.cpuTime} \n${res.data.output} `
      );
    } else {
      setOutputLogs(`${res.data.output} `);
    }
    setStat('Run');
  });

export const contactPost = () =>
  API.post(
    '/contact/post',
    (contactData = { Name: name, Email: email, Phone: phone, Message: message })
  ).then(() => {
    alert('Thank You For Contacting Us');
  });

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signin', formData);
