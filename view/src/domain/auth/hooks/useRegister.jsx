import { useState } from 'react';

const useRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return { formData, onChange };
};

export default useRegister;
