import React from "react";

const UpdateQuestions = () => {
    return (
        <section>
          <div class="container">
              <div class="row">
                <h2 class="mt-3">Update Question</h2>
                <h3 class="mt-3" style={{color: '#285474'}}>Choose a question to update</h3>
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

                    <div class="world-btns">
                        <label for="inputName" class="form-label">Question No.:</label>
                        <div class="input-group-btn">
                            <div class="btn-world">
                                <input type="radio" name="questionno" value="1" />1
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="questionno" value="2" />2
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="questionno" value="3" />3
                            </div>
                        </div>
                    </div>

                    <div class="qn-input">
                        <label for="inputName" class="form-label">Question:</label>
                        <input type="text" class="form-control" id="inputQuestion" name="question" />
                    </div>

                    <div class="qn-input">
                        <label for="inputName" class="form-label">Options:</label>
                        <input type="text" class="form-control" id="answerA" name="answer" />
                        <input type="text" class="form-control" id="answerB" name="answer" />
                        <input type="text" class="form-control" id="answerC" name="answer" />
                        <input type="text" class="form-control" id="answerD" name="answer" />
                    </div>

                    <div class="world-btns">
                        <label for="inputName" class="form-label">Answer:</label>
                        <div class="input-group-btn">
                            <div class="btn-world">
                                <input type="radio" name="answer" value="A" />A
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="answer" value="B" />B
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="answer" value="C" />C
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="answer" value="D" />D
                            </div>
                        </div>
                    </div>

                    <div class="bottom-btns ml-3">
                        <input type="button" class="btn btn-danger float-end" id="btn-back" value="Cancel" />
                        <input type="button" class="btn btn-primary" id="btn-ok-create" value="Done" />
                    </div>
                </div>
          </div>
    </section>

);
}

export default UpdateQuestions;