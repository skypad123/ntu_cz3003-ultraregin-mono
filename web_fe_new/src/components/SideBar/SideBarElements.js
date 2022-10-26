import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #d9d9d9;
    position: fixed;
    height: 100%;
    overflow: auto;
`;
  
export const NavLink = styled(Link)`
    display: block;
    color: black;
    font-weight: bold;
    padding: 16px;
    text-decoration: none;
    &.active {
        background-color: #285474;
        opacity: 80%;
      }
  }
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;