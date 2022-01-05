import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router';
import { errorHandler } from '../../../utils/errorHandler';
import { FallBackLayout } from '../../layouts/FallBackLayout';
import refreshTokenSetup from '../utils/refreshToken';
import Icon from '../templates/Icon';
import { register } from '../../../redux/actions/authActions';
import useRegister from '../hooks/useRegister';

function Register() {
  const { formData, onChange } = useRegister();
  const history = useHistory();
  const dispatch = useDispatch(null);
  const { name, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log(`Passwords do not match`);
    } else {
      dispatch(register({ name, email, password }));

      setTimeout(() => {
        window.location.reload(false);
      }, 2);
      return <Redirect to='/' />;
    }
    return null;
  };

  // Redirect if logged in

  // Redirect if logged in

  const googleSuccess = async (response) => {
    try {
      localStorage.setItem('g-auth-token', response.tokenId);
      localStorage.setItem('authType', 'Google');
      history.push('/');
      setTimeout(() => {
        window.location.reload(false);
      }, 2);
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
      <div className='register-form'>
        <div className='register-inner-form'>
          <h1 className='heading'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Create Your Account
          </p>
          <br />
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                name='name'
                onChange={(e) => onChange(e)}
                placeholder='Name'
                type='text'
                value={name}
              />
            </div>
            <div className='form-group'>
              <input
                name='email'
                onChange={(e) => onChange(e)}
                placeholder='Email Address'
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
                type='password'
                value={password}
              />
            </div>
            <div className='form-group'>
              <input
                minLength='6'
                name='password2'
                onChange={(e) => onChange(e)}
                placeholder='Confirm Password'
                type='password'
                value={password2}
              />
            </div>
            <input className='auth__button' type='submit' value='Register' />
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
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Register;
