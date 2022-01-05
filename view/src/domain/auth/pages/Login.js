import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { ErrorBoundary } from 'react-error-boundary';
import { refreshTokenSetup } from '../utils/refreshToken';
import useLogin from '../hooks/useLogin';
import Alert from '../../layouts/Alert';
import Icon from '../templates/Icon';
import { errorHandler } from '../../../utils/errorHandler';
import { FallBackLayout } from '../../layouts/FallBackLayout';

import { login } from '../../../redux/actions/authActions';

const Login = () => {
  const { onChange, formData } = useLogin();
  const { email, password } = formData;
  const dispatch = useDispatch(null);

  const auth = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setTimeout(() => {
      window.location.reload(false);
    }, 2);
    return <Redirect to='/' />;
  };

  const googleSuccess = async (response) => {
    try {
      setTimeout(() => {
        window.location.reload(false);
      }, 2);
      localStorage.setItem('g-auth-token', response.tokenId);
      localStorage.setItem('authType', 'Google');
      refreshTokenSetup(response);
      return <Redirect to='/' />;
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (res) => {
    console.log('[Login failed] res:', res);
  };

  return (
    <ErrorBoundary FallbackComponent={FallBackLayout} onError={errorHandler}>
      <div className='login-form'>
        <section className='login-inner-form'>
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
        </section>
      </div>
    </ErrorBoundary>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  authType: PropTypes.string,
  token: PropTypes.string,
};

export default Login;
