import { useState } from 'react';
import Input from '../templates/Input';

const Auth = () => {
  const isSignup = true;
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  return (
    <section className='auth'>
      <section className='auth__section-1'>
        <section className='auth__section-1__sub-section-1'>
          <img src='' className='auth__section-1__sub-section-1__item-1' />
        </section>
        <h5 className='auth__section-1__sub-section-1__item-2'>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </h5>
        <form onSubmit={handleSubmit} className='auth__section-1__item-1'>
          <section className='auth__section-1__item-1__section-1'>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  type='text'
                  autofocus
                  half
                  className='auth__section-1__item-1__section-1__item-1'
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                  type='text'
                  className='auth__section-1__item-1__section-1__item-2'
                />
              </>
            )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </section>
          <button type='submit'>{isSignup ? 'Sign Up' : 'Sign In'}</button>
        </form>
      </section>
    </section>
  );
};

export default Auth;
