import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import useLogin from '../hooks/useLogin';
import Alert from '../../layouts/Alert';
import { login } from '../../../redux/actions/authActions';
import Icon from '../templates/Icon';
import { API } from '../../../api';

const Login = ({ login, isAuthenticated }) => {
  const { onChange, formData } = useLogin();
  const { email, password } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };
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
    <div className='login-form'>
      <h1 className='heading'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <Alert />
      <br />
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
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
            required
          />
        </div>
        <input type='submit' value='Login' className='auth__button' />
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
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
