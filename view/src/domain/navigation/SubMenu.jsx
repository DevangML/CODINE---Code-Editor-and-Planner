/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import { SidebarLink, SidebarLabel, DropdownLink } from './styles/styleModules/subMenuStyles';

const SubMenu = function ({ item }) {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>{item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}</div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => (
          <DropdownLink to={item.path} key={index}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
