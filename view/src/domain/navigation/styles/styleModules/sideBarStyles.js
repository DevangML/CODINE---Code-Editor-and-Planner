import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.div`
  height: 12.9vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`;

export const NavIcon = styled(Link)`
  font-size: 3.1vh;
  margin-left: 1vw;
  min-height: 9vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  min-width: 9vh;
  flex-shrink: 0;
  background: #000428;
  background: -webkit-linear-gradient(to right, #004e92, #000428);
  background: linear-gradient(to right, #004e92, #000428);
  padding: 0.26vw;
  z-index: 400;
  margin-top: 7vh;

  @media screen and (max-aspect-ratio: 4/5) {
    min-width: 7.5vh;
    min-height: 7.5vh;
    border-radius: 50%;
  }
  @media screen and (max-aspect-ratio: 3/5) {
    min-width: 6vh;
    min-height: 6vh;
    border-radius: 50%;
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  background: #000428;
  background: -webkit-linear-gradient(to right, #004e92, #000428);
  background: linear-gradient(to right, #004e92, #000428);
  min-width: 28vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;

export const Logout = styled(Link)`
  background: #6100c2;
  outline: none;
  border-radius: 1vh;
  font-size: 3vh;
  color: gold;
  max-width: 50%;
  min-width: 40%;
  text-align: center;
  transition: all cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5%;
  max-height: 10%;

  &:hover {
    /* border: 2px solid white; */
    background: #8e2de2; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #4a00e0,
      #8e2de2
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #4a00e0,
      #8e2de2
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: #fff;
  }
`;
