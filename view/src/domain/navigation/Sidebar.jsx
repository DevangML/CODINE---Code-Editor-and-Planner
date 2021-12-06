import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import SidebarData from './SidebarData';
import SubMenu from './SubMenu';
import { logout } from '../../redux/actions/authActions';
import { Nav, NavIcon, SidebarNav, SidebarWrap, Logout } from './styles/styleModules/sideBarStyles';

const Sidebar = ({ auth: logout }) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
        <Logout onclick={logout} to='/' replace>
          <span>Logout</span>
        </Logout>
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
