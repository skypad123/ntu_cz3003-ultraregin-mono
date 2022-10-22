import React from "react";
import {Nav, NavLink} from "./SideBarElements";
import sidebar_logo from "./sidebar-logo.JPG";

const SideBar = () => {
    return (
      <>
        <Nav>
            <img src={sidebar_logo} style={{width: '180px'}} alt="sidebar-logo" />
            <NavLink to="/play" activeStyle>
              Play
            </NavLink>
            <NavLink to="/create" activeStyle>
              Create
            </NavLink>
            <NavLink to="/read" activeStyle>
              Read
            </NavLink>
            <NavLink to="/update" activeStyle>
              Update
            </NavLink>
            <NavLink to="/delete" activeStyle>
              Delete
            </NavLink>
         
        </Nav>
      </>
    );
  };
    
  export default SideBar;