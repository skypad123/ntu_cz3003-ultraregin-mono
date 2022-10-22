import React from "react";

const login = () => {
    return (
        <section>
            <div class="container-login">
                <div class="card mt-3 border-0">
                    <img src="img/ultrareign-logo.jpg" width="300" height="300" class="img-center"></img>
                </div>    

                <div class="user-details-container">
                      <div class="user-input">
                          <span class="input-group-text"> <i class="fas fa-user"></i> </span>
                          <input name="username" class="form-control" placeholder="User name" type="text" required></input>
                      </div> 
                  
                      <div class="user-input">
                          <span class="input-group-text"> <i class="fas fa-lock"></i> </span>
                          <input class="form-control" name="password" placeholder="Password" type="password" required></input>
                      </div> 

                      <div class="d-grid">
                        <input type="button" class="btn" id="btn-login" value=" LOGIN  "></input>
                      </div>
                       

                </div>
            </div>
        </section>
    );
  }

export default login;