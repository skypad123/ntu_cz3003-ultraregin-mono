import React from "react";
import {Nav, NavLink} from "./SideBarElements";
import sidebar_logo from "./sidebar-logo.JPG";
import { matchPath, useLocation } from 'react-router-dom';

const StudentSideBar = () => {
    return (
      <>
        <Nav>
            <a href="http://localhost:3000/"> <img src={sidebar_logo} style={{width: '180px'}} alt="sidebar-logo" /> </a>
            <NavLink to="/leaderboard" activeStyle>
              Leaderboard
            </NavLink>
            <NavLink to="/create-student" activeStyle>
              Create
            </NavLink>
            <NavLink to="/read-student" activeStyle>
              Read
            </NavLink>
            <NavLink to="/update-questions-student" activeStyle>
              Update
            </NavLink>
            {/* <NavLink to="/choose-delete-questions" activeStyle>
              Delete
            </NavLink> */}
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
            <a href="http://localhost:3000/"> <img src={sidebar_logo} style={{width: '180px'}} alt="sidebar-logo" /> </a>
            <NavLink to="/summary-report" activeStyle>
              Summary Report
            </NavLink>
            <NavLink to="/create" activeStyle>
              Create
            </NavLink>
            <NavLink to="/read" activeStyle>
              Read
            </NavLink>
            <NavLink to="/update-questions" activeStyle>
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