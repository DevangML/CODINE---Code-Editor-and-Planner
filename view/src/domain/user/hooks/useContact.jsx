import { useState } from 'react';
import { API } from '../../../api/index';

const useContact = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const onContactDataChange = (e) => {
    setContactData({
      name: e.target.value,
      email: e.target.value,
      phone: e.target.value,
      message: e.target.value,
    });
  };

  const resetForm = () => {
    setContactData({ name: '', email: '', phone: '', message: '' });
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
    onContactDataChange,
    handleSubmit,
    contactData,
  };
};

export default useContact;
