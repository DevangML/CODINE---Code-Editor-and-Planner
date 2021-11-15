import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 3.22vw;
    list-style: none;
    height: 9.66vh;
    text-decoration: none;
    font-size: 2.9vh;
    @media only screen and (min-aspect-ratio: 183/125) {
        font-size: 5vh;
    }
    @media only screen and (min-aspect-ratio: 170/67) {
        font-size: 8vh;
    }
    @media only screen and (max-aspect-ratio: 43/137) {
        font-size: 2.2vh;
    }

    @media only screen and (max-aspect-ratio: 33/137) {
        font-size: 1.5vh;
    }

    @media only screen and (max-aspect-ratio: 24/137) {
        font-size: 1vh;
    }

    &:hover {
        background: #870000; /* fallback for old browsers */
        background: -webkit-linear-gradient(
            to right,
            #190a05,
            #870000
        ); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(
            to right,
            #190a05,
            #870000
        ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        color: white;
        border-left: 0.644vh solid #632ce4;
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 1.29vw;
`;

const DropdownLink = styled(Link)`
    background: #0f2027;
    background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027);
    background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
    height: 12.66vh;
    padding-left: 4.7vw;
    padding-right: 1vw;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 3vw;
    margin-bottom: -2vh;
    &:hover {
        background: #632ce4;
        color: white;
        cursor: pointer;
    }
`;

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
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                        ? item.iconClosed
                        : null}
                </div>
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
