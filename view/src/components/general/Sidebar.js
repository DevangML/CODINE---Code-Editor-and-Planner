import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'
import styled from 'styled-components'

const Nav = styled.div`
  height: 12.9vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`

const NavIcon = styled(Link)`
  font-size: 3.1vh;
  margin-left: 1vw;
  min-height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5vw;
  min-width: 8vw;
  flex-shrink: 0;
  background: #000428;
  background: -webkit-linear-gradient(to right, #004e92, #000428);
  background: linear-gradient(to right, #004e92, #000428);
  padding: 0.26vw;
  z-index: 400;
  margin-top: 7vh;
`

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  background: #000428;
  background: -webkit-linear-gradient(to right, #004e92, #000428);
  background: linear-gradient(to right, #004e92, #000428);
  min-width: 28vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  top: 0;
  overflow: hidden;
  overflow-x: hidden;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: all 0.6s 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0ms;
  z-index: 401;
  margin-top: -8vh;
  max-width: 35vw;
  min-height: 120vh;
  border-top-right-radius: 25vh;
  border-bottom-right-radius: 25vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  -webkit-overflow-style: none;
  overflow-y: scroll;

  @media only screen and (max-aspect-ratio: 125/137) {
    min-width: 50vw;
  }

  @media only screen and (max-aspect-ratio: 62/137) {
    min-width: 70vw;
  }  
`

const SidebarWrap = styled.div`
  width: 100%;
`

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars
              style={({ minWidth: '4vw' }, { minHeight: '5vh' })}
              onClick={showSidebar}
            />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
