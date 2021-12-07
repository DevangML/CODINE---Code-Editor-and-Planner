import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const useLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return { formData, onChange };
};

export default useLogin;
