import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const useRegister = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    password: '',
    password2: '',
  });

  const { names, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log('Form data', e);
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ names, email, password });
    }
  };

  // Redirect if logged in
  // if (localStorage.token) {
  //   return <Redirect to='/' />;
  // }

  return { formData, onChange, onSubmit };
};

export default useRegister;
