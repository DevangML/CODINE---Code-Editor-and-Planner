import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../../redux/constants/authTypes';
import { signup, signin } from '../../../redux/actions/authActions';
import Input from '../templates/Input';
import Icon from '../styles/Icon';

require('path');
require('dotenv').config({ path: '.env' });

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  const googleFailure = (err) => {
    console.log('fail', err);
  };
  return (
    <section className='auth'>
      <section className='auth__section-1'>
        <section className='auth__section-1__sub-section-1'>
          <div className='auth__section-1__sub-section-1__item-1'>&nbsp;</div>
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
                  placeholder='First Name'
                  handleChange={handleChange}
                  type='text'
                  className='auth__section-1__item-1__section-1__item-1'
                />
                <Input
                  name='lastName'
                  placeholder='Last Name'
                  handleChange={handleChange}
                  type='text'
                  className='auth__section-1__item-1__section-1__item-2'
                />
              </>
            )}
            <Input
              name='email'
              placeholder='Email Address'
              handleChange={handleChange}
              type='email'
              className='auth__section-1__item-1__section-1__item-3'
            />
            <Input
              name='password'
              placeholder='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
              className='auth__section-1__item-1__section-1__item-4'
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                placeholder='Repeat Password'
                handleChange={handleChange}
                type='password'
                className='auth__section-1__item-1__section-1__item-4'
              />
            )}
          </section>
          <button type='submit' className='auth__section-1__item-1__sub-item-2'>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
          <br />
          {/*eslint-disable */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GCID}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            coockiePolicy='single_host_origin'
            render={(renderProps) => (
              <button
                className='auth__section-1__item-1__sub-item-1'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
              >
                Google Sign In
              </button>
            )}
          />
          {/* eslint-enable */}
          <br />
          <button className='auth__section-1__item-1__sub-item-3' onClick={switchMode}>
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account Sign Up"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default Auth;
