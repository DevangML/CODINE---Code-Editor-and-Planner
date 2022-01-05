import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { GoogleLogin } from 'react-google-login';
import { ErrorBoundary } from 'react-error-boundary';
import refreshTokenSetup from '../utils/refreshToken';
import useLogin from '../hooks/useLogin';
import Icon from '../templates/Icon';
import { errorHandler } from '../../../utils/errorHandler';
import { FallBackLayout } from '../../layouts/FallBackLayout';

import { login } from '../../../redux/actions/authActions';

function Login() {
  const { onChange, formData } = useLogin();
  const { email, password } = formData;
  const dispatch = useDispatch(null);

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
    return null;
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
          <br />
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                name='email'
                onChange={(e) => onChange(e)}
                placeholder='Email Address'
                required
                type='email'
                value={email}
              />
            </div>
            <div className='form-group'>
              <input
                minLength='6'
                name='password'
                onChange={(e) => onChange(e)}
                placeholder='Password'
                required
                type='password'
                value={password}
              />
            </div>
            <input className='auth__button' type='submit' value='Login' />
            <GoogleLogin
              clientId={process.env.REACT_APP_GCID}
              cookiePolicy='single_host_origin'
              onFailure={googleError}
              onSuccess={googleSuccess}
              render={(renderProps) => (
                <button
                  className='googleButton'
                  disabled={renderProps.disabled}
                  onClick={renderProps.onClick}
                  startIcon={<Icon />}
                  type='button'
                >
                  Google Sign In
                </button>
              )}
            />
          </form>
          <p className='link'>
            Don`&apos`t have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </section>
      </div>
    </ErrorBoundary>
  );
}

export default Login;
