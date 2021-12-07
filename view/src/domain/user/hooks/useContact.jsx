import { useState } from 'react';
import { API } from '../../../api/index';

const useContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onMsgChange = (e) => {
    setMessage(e.target.value);
  };

  const data = { name, email, phone, message };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

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
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onMsgChange,
    handleSubmit,
  };
};

export default useContact;
