import React from "react";
import {Nav, NavLink} from "./SideBarElements";
import sidebar_logo from "./sidebar-logo.JPG";
import { useLocation } from 'react-router-dom';

const StudentSideBar = () => {
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
            <NavLink to="/choose-update-questions" activeStyle>
              Update
            </NavLink>
            <NavLink to="/choose-delete-questions" activeStyle>
              Delete
            </NavLink>
            <NavLink to="/challenge" activeStyle>
              Challenge
            </NavLink>
         
        </Nav>
      </>
    );
  };

  const ProfessorSideBar = () => {
    const {pathname} = useLocation();
    return (
      <>
        <Nav>
            <img src={sidebar_logo} style={{width: '180px'}} alt="sidebar-logo" />
            <NavLink to="/summary-report" activeStyle>
              Summary Report
            </NavLink>
            <NavLink to="/create" activeStyle>
              Create
            </NavLink>
            <NavLink to="/read" activeStyle>
              Read
            </NavLink>
            <NavLink to="/choose-update-questions" isActive={() => ['/choose-update-questions', '/update-question'].includes(pathname)} activeStyle>
              Update
            </NavLink>
            <NavLink to="/choose-delete-questions" activeStyle>
              Delete
            </NavLink>
         
        </Nav>
      </>
    );
  };
    
  export { StudentSideBar, ProfessorSideBar };