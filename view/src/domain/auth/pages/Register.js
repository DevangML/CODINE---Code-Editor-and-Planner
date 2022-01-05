import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router';
import { errorHandler } from '../../../utils/errorHandler';
import { FallBackLayout } from '../../layouts/FallBackLayout';
import { refreshTokenSetup } from '../utils/refreshToken';
import Icon from '../templates/Icon';
import { register } from '../../../redux/actions/authActions';
import Alert from '../../layouts/Alert';
import setAlert from '../../../redux/actions/alertActions';
import useRegister from '../hooks/useRegister';
import store from '../../../redux/store';

const Register = ({ setAlert, isAuthenticated }) => {
  const { formData, onChange } = useRegister();
  const history = useHistory();
  const dispatch = useDispatch(null);
  const { name, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      dispatch(register({ name, email, password }));

      setTimeout(() => {
        window.location.reload(false);
      }, 2);
      return <Redirect to='/' />;
    }
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
      </div>
    </ErrorBoundary>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default Register;
