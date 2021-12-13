import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { refreshTokenSetup } from '../utils/refreshToken';
import Icon from '../templates/Icon';
import { API } from '../../../api';
import { register } from '../../../redux/actions/authActions';
import Alert from '../../layouts/Alert';
import setAlert from '../../../redux/actions/alertActions';
import useRegister from '../hooks/useRegister';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const { formData, onChange } = useRegister();
  const { name, email, password, password2 } = formData;
  const onSubmit = async (e) => {
    console.log('Form data', e);
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if logged in
  if (localStorage.token) {
    window.location.reload(false);
  }

  const [googleData, setGoogleData] = useState(
    localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null
  );
  const history = useHistory();
  const dispatch = useDispatch(null);
  // Redirect if logged in
  if (localStorage.token) {
    history.go(0);
  }

  const googleSuccess = async (response) => {
    try {
      const res = await API.post('/auth/google/save', { token: response.tokenId });

      setGoogleData(res);

      await localStorage.setItem('googleData', JSON.stringify(res));
      await history.push('/');
      setTimeout(() => {
        window.location.reload(false);
      }, 2);
      refreshTokenSetup(response);
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (res) => {
    console.log('[Login failed] res:', res);
  };

  return (
    <div className='register-form'>
      <h1 className='heading'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <Alert />
      <br />
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='auth__button' value='Register' />
        <GoogleLogin
          clientId={process.env.REACT_APP_GCID}
          render={(renderProps) => (
            <button
              className='googleButton'
              color='primary'
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Icon />}
              variant='contained'
            >
              Google Sign In
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy='single_host_origin'
        />
      </form>
      <p className='link'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
