import { useState, useRef } from 'react';

const useContact = () => {
  const [contactInput, setContactInput] = useState({
    name: '',
    email: '',
    phone: null,
    message: '',
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setContactInput({
      name: '',
      email: '',
      phone: null,
      message: '',
    });
  };

  const handleChange = (e) => {
    setContactInput({
      ...contactInput,
      [e.target.name]: e.target.value,
    });
  };

  const data = {
    name: contactInput.name,
    email: contactInput.email,
    phone: contactInput.phone,
    message: contactInput.message,
  };

  return {
    error,
    setError,
    contactInput,
    setContactInput,
    handleChange,
    resetForm,
    data,
  };
};

export default useContact;
