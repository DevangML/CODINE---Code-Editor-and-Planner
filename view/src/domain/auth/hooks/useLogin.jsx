import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const useLogin = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  // Redirect if logged in
  // if (isAuthenticated) {
  //   return <Redirect to='/home' />;
  // }

  return { formData, onChange, onSubmit };
};

export default useLogin;
