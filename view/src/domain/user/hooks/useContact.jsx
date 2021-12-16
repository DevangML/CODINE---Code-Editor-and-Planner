import { useState } from 'react';
import { API } from '../../../api/index';

const useContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(null);
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone(null);
    setMessage('');
  };

  const data = { name: name, email: email, phone: phone, message: message };

  const handleSubmit = async (e) => {
    e.preventDefault();
    API.post('/contact/post', data)
      .then((res) => {
        console.log(res);
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    setName,
    setEmail,
    setPhone,
    setMessage,
    handleSubmit,
  };
};

export default useContact;
