import React from "react";

const StudentPlay = () => {
    return (
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-lg">
                        <h2 class="mt-3">Play</h2>
                    </div>
                </div>

                <div class="user-details-container">
                    
                    <div class="world-btns">
                        <label for="inputName" class="form-label">World:</label>
                        <div class="input-group-btn">
                            <div class="btn-world">
                                <input type="radio" name="world" value="1" />1
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="world" value="2" />2
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="world" value="3" />3
                            </div>
                        </div>
                    </div>

                    <div class="world-btns">
                        <label for="inputName" class="form-label">Level:</label>
                        <div class="input-group-btn">
                            <div class="btn-world">
                                <input type="radio" name="level" value="1" />1
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="level" value="2" />2
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="level" value="3" />3
                            </div>
                        </div>
                    </div>
        
                    <div class="d-grid" style={{marginTop: '20px'}}>
                        <input type="button" class="btn btn-primary" value=" PLAY! " />
                    </div> 

                </div>
            
            </div>
        </section>
    );
}

export default StudentPlay;