import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Routes, Route}
from 'react-router-dom';
import ultrareign_logo from './ultrareign-logo.JPG';

const Login = (props) => {
    const [password,setPassword] = useState("");
    const [identifier,setIdentifier] = useState("");


    function handlePasswordChange(value){
        setPassword(value);
    }

    function handleIdentifierChange(value){
        setIdentifier(value);
    }

    function handleUserChosen(value){
        console.log(value);
    }

    return (
        <>
        <section>
            <div class="container-login">
                <div class="card mt-3 border-0">
                    <img src={ultrareign_logo} width="300" height="300" class="img-center" alt="ultrareign_logo"></img>
                </div>    

                <div class="user-details-container">
                    <div class="d-grid" onChange={(x) => {handleUserChosen(x.target.value)}} >
                        <label><input type="radio" name="user" id="btn-student" value="student" /> STUDENT </label>
                        <label><input type="radio" name="user" id="btn-professor" value="professor" /> PROFESSOR </label>
                      </div>

                      <div class="user-input">
                          <span class="input-group-text"> <i class="fas fa-user"></i> </span>
                          <input name="username" class="form-control" placeholder="User name" type="text" onChange={(x)=>{handleIdentifierChange(x.target.value)}} required></input>
                      </div> 
                  
                      <div class="user-input">
                          <span class="input-group-text"> <i class="fas fa-lock"></i> </span>
                          <input class="form-control" name="password" placeholder="Password" type="password" onChange={(x)=>{handlePasswordChange(x.target.value)}} required></input>
                      </div> 

                      <div class="d-grid">
                        <input type="button" class="btn" id="btn-login" style={{marginRight:"10px"}} onClick={()=>{props.onEmailSignIn(identifier,password)}} value="LOGIN"></input>
                        <Link to="/Facebook">
                            <input type="button" class="btn" id="btn-login" value="LOGIN by Facebook"></input>                      
                        </Link>                        
                      </div>
                       

                </div>
            </div>
        </section>
        <Routes>
            <Route path='/Facebook' element={<FacebookRedirect />} />
        </Routes>
        </>
    );
  }

  function FacebookRedirect(){



    window.location.replace(`${process.env.REACT_APP_BE_URL}/connect/facebook`);
    return null
  }

export default Login;