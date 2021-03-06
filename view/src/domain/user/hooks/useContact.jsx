import { useState } from 'react';
import { API, setHeaders } from '../../../api/index';

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

  const data = {
    name,
    email,
    phone,
    message,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/contact/create', data, setHeaders())
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
