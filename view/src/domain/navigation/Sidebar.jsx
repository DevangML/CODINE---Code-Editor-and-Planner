import { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import SidebarData from './SidebarData';
import SubMenu from './SubMenu';
import { logout } from '../../redux/actions/authActions';
import { Nav, NavIcon, SidebarNav, SidebarWrap, Logout } from './styles/styleModules/sideBarStyles';

const Sidebar = () => {
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

  const onSuccess = () => {
    localStorage.clear();
    history.go(0);
  };

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
          <NavIcon to='#'>
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          </NavIcon>
          {SidebarData.map((item, index) => (
            <SubMenu item={item} key={index} />
          ))}
        </SidebarWrap>
        {localStorage.token && (
          <Logout onClick={() => handleSignOut()} to='/' replace>
            <span>Logout</span>
          </Logout>
        )}
        {localStorage.googleData && (
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

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Sidebar);
