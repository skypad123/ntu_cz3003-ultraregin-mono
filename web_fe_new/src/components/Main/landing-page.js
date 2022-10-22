import React from "react";

const LandingPage = () => {
    return (
        <section>
            <div class="container-login">
                <div class="card mt-3 border-0">
                    <img src="img/ultrareign-logo.jpg" width="300" height="300" class="img-center"></img>
                </div>     

                <div class="user-details-container">
                   
                        <div id="student-btn" class="d-grid" style={{paddingTop: '5px'}}>
                            <input type="button" class="btn" id="btn-student" value="  STUDENT  "></input>
                        </div> 
                        
                        <div id="professor-btn" class="d-grid" style={{paddingTop: '5px'}}>
                            <input type="button" class="btn" id="btn-professor" value=" PROFESSOR  "></input>
                        </div> 
                        
                  
                </div> 
                
            </div>
        </section>
    );
} 

export default LandingPage;