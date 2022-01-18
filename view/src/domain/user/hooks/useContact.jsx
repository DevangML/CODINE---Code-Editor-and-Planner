import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../api/index';

const useContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(null);
  const [message, setMessage] = useState('');

  const auth = useSelector((state) => state.auth);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone(null);
    setMessage('');
  };

  const { authType } = auth;
  const { token } = auth;

  const data = {
    token,
    authType,
    name,
    email,
    phone,
    message,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('/contact/create', data)
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
