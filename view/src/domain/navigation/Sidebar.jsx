import { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import SidebarData from './SidebarData';
import SubMenu from './SubMenu';
import { logout } from '../../redux/actions/authActions';
import { Nav, NavIcon, SidebarNav, SidebarWrap, Logout } from './styles/styleModules/sideBarStyles';
import { API } from '../../api';

const Sidebar = function () {
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  const showSidebar = () => setSidebar(!sidebar);

  const handleSignOut = () => {
    dispatch(logout());
    history.go(0);
  };

  const onSuccess = async () => {
    dispatch(logout());
    history.push('/');
    setTimeout(() => {
      window.location.reload(false);
    }, 2);
  };

  let googleSaveHandler;

  if (state.auth.authType === 'Google') {
    googleSaveHandler = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { token } = state.auth;
      const { authType } = state.auth;
      const body = { authType, token };
      await API.post('/auth/create/3', body, config);
      await API.post('/auth/create/4', body, config);
    };
  }

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <Nav>
        <NavIcon to='#'>
          <FaIcons.FaBars
            style={({ minWidth: '4vw' }, { minHeight: '5vh' })}
            onClick={showSidebar}
          />
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to='#' onClick={googleSaveHandler}>
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          </NavIcon>
          {SidebarData.map((item, index) => (
            <SubMenu item={item} key={index} />
          ))}
        </SidebarWrap>
        {state.auth.authType === 'jwtAuth' && (
          <Logout onClick={() => handleSignOut()} to='/' replace>
            <span>Logout</span>
          </Logout>
        )}
        {state.auth.authType === 'Google' && (
          <GoogleLogout
            clientId={process.env.REACT_APP_GCID}
            buttonText='Logout'
            onLogoutSuccess={onSuccess}
          />
        )}
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
