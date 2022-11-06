import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const UpdateQuestionStudent = () => {
    const navigate = useNavigate();
    const [searchparams] = useSearchParams();
    const [questionID, setQuestionID] = useState();
    const [questionData, setQuestionData] = useState();

    const [world, setWorld] = useState('0');
    const [level, setLevel] = useState();
    const [question, setQuestion] = useState();
    const [questionDesc, setQuestionDesc] = useState();
    const [optionA, setOptionADesc] = useState();
    const [optionB, setOptionBDesc] = useState();
    const [optionC, setOptionCDesc] = useState();
    const [optionD, setOptionDDesc] = useState();
    const [answer, setAnswer] = useState('E');

    useEffect(() => {
        getQuestionData();
    }, []);

    const getQuestionData = () => {
        axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/questions/' + searchparams.get('id'), {
            headers:{
                // contentType: 'application/json',
                Authorization:
                    "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
            }, 
        })
        .then ((response) => {
            console.log(response.data.data.attributes)
            const questionData = response.data.data.attributes;
            setQuestionData(questionData.name);
            setWorld(questionData.name.split(',')[0]);
            setLevel(questionData.name.split(',')[1]);
            setQuestion(questionData.name.split(',')[2]);
            setAnswer(questionData.actual_answer);
            setQuestionDesc(questionData.description);
            setOptionADesc(questionData.fake_answers.split(",")[0]);
            setOptionBDesc(questionData.fake_answers.split(",")[1]);
            setOptionCDesc(questionData.fake_answers.split(",")[2]);
            setOptionDDesc(questionData.fake_answers.split(",")[3]);
        })
        .catch(error => console.log(error));
        
    }

    const handleCancel = async e => {
        navigate({
            pathname: '/update-questions-student'
        })
    }

    const handleSubmit = async e => {
        if (!world || !level || !question || !questionDesc || !optionA || !optionB || !optionC || !optionD || !answer){
            window.alert("Enter all fields!")
        }
        else {
            e.preventDefault();
            try {
                let response = await axios.put('https://ultraregin-be-vs7vz.ondigitalocean.app/api/questions/'+ searchparams.get('id'), {
                    data: {
                        "name": world + "," + level + "," + question,
                        "description": questionDesc,
                        "fake_answers": optionA + "," + optionB + "," + optionC + "," + optionD,
                        "actual_answer": answer,
                    }
                },  
                {
                    headers:{
                        // contentType: 'application/json',
                        Authorization:
                            "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
                    }, 
                })
    
                axios.put('https://ultraregin-be-vs7vz.ondigitalocean.app/api/level-question-compositions/'+ searchparams.get('id'), {
                    data: {
                        "question": world + "," + level + "," + question,
                        "level": level,
                        "question_position": question,
                    }
                },  
                {
                    headers:{
                        // contentType: 'application/json',
                        Authorization:
                            "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
                    }, 
                })
    
                // console.log(response)
                if (response.status === 200){
                    window.alert("Question Updated")
                    navigate({
                        pathname: '/update-questions-student'
                    })
                }
            }  
            catch (e) {
                console.log(e)
            } 
        }
    }
    

    return (
        <section>
          <div class="container">
              <div class="row">
                <h2 class="mt-3">Update Question</h2>
              </div>

              <div class="user-details-container">
                    
                    <div class="world-btns">
                        <label for="inputName" class="form-label">World:</label>
                            {(() => {
                                switch (world) {
                                    case "4": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="worldCustom" name="world" value="4" checked onChange = {e => setWorld(e.target.value)} />
                                            <label for="worldCustom">Custom</label>
                                        </div>
                                    )
                                    case "0": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="world1" name="world" value="1" onChange = {e => setWorld(e.target.value)} />
                                            <label for="world1">1</label>
                                            <input type="radio" id="world2" name="world" value="2" onChange = {e => setWorld(e.target.value)} />
                                            <label for="world2">2</label>
                                            <input type="radio" id="world3" name="world" value="3" onChange = {e => setWorld(e.target.value)} />
                                            <label for="world3">3</label>
                                            <input type="radio" id="worldCustom" name="world" value="4" onChange = {e => setWorld(e.target.value)} />
                                            <label for="worldCustom">Custom</label>
                                        </div>
                                    )

                                }
                            }) ()}   
                    </div>

                    <div class="world-btns">
                        <label for="inputName" class="form-label">Level:</label>
                        {(() => {
                                switch (level) {
                                    case "1": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="level1" name="level" value="1" checked onChange = {e => setLevel(e.target.value)} />
                                            <label for="level1">1</label>
                                            <input type="radio" id="level2" name="level" value="2" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level2">2</label>
                                            <input type="radio" id="level3" name="level" value="3" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level3">3</label>
                                        </div>
                                    )
                                    case "2": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="level1" name="level" value="1" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level1">1</label>
                                            <input type="radio" id="level2" name="level" value="2" checked onChange = {e => setLevel(e.target.value)} />
                                            <label for="level2">2</label>
                                            <input type="radio" id="level3" name="level" value="3" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level3">3</label>
                                        </div>
                                    )
                                    case "3": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="level1" name="level" value="1" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level1">1</label>
                                            <input type="radio" id="level2" name="level" value="2" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level2">2</label>
                                            <input type="radio" id="level3" name="level" value="3" checked onChange = {e => setLevel(e.target.value)} />
                                            <label for="level3">3</label>
                                        </div>
                                    )
                                    case "0": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="level1" name="level" value="1" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level1">1</label>
                                            <input type="radio" id="level2" name="level" value="2" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level2">2</label>
                                            <input type="radio" id="level3" name="level" value="3" onChange = {e => setLevel(e.target.value)} />
                                            <label for="level3">3</label>
                                        </div>
                                    )

                                }
                            }) ()}   
                    </div>

                    <div class="world-btns">
                        <label for="inputName" class="form-label">Question No.:</label>
                        {(() => {
                                switch (question) {
                                    case "1": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="question1" name="question" value="1" checked onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question1">1</label>
                                            <input type="radio" id="question2" name="question" value="2" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question2">2</label>
                                            <input type="radio" id="question3" name="question" value="3" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question3">3</label>
                                        </div>
                                    )
                                    case "2": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="question1" name="question" value="1" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question1">1</label>
                                            <input type="radio" id="question2" name="question" value="2" checked onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question2">2</label>
                                            <input type="radio" id="question3" name="question" value="3" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question3">3</label>
                                        </div>
                                    )
                                    case "3": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="question1" name="question" value="1" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question1">1</label>
                                            <input type="radio" id="question2" name="question" value="2" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question2">2</label>
                                            <input type="radio" id="question3" name="question" value="3" checked onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question3">3</label>
                                        </div>
                                    )
                                    case "0": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="question1" name="question" value="1" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question1">1</label>
                                            <input type="radio" id="question2" name="question" value="2" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question2">2</label>
                                            <input type="radio" id="question3" name="question" value="3" onChange = {e => setQuestion(e.target.value)} />
                                            <label for="question3">3</label>
                                        </div>
                                    )

                                }
                            }) ()}   
                        
                    </div>

                    <div class="qn-input">
                        <label for="inputName" class="form-label">Question:</label>
                        <input type="text" class="form-control" id="inputQuestion" name="questionDesc" value={questionDesc} onChange = {(e) => setQuestionDesc(e.target.value)} />
                    </div>

                    <div class="qn-input">
                        <label for="inputName" class="form-label">Options:</label>
                        <input type="text" class="form-control" id="optionA" name="option" value={optionA} onChange = {(e) => setOptionADesc(e.target.value)} />
                        <input type="text" class="form-control" id="optionB" name="option" value={optionB} onChange = {(e) => setOptionBDesc(e.target.value)} />
                        <input type="text" class="form-control" id="optionC" name="option" value={optionC} onChange = {(e) => setOptionCDesc(e.target.value)} />
                        <input type="text" class="form-control" id="optionD" name="option" value={optionD} onChange = {(e) => setOptionDDesc(e.target.value)} />
                    </div>

                    <div class="world-btns">
                        <label for="inputName" class="form-label">Answer:</label>
                        {(() => {
                                switch (answer) {
                                    case "A": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="answerA" name="answer" value="A" checked onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerA">A</label>
                                            <input type="radio" id="answerB" name="answer" value="B" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerB">B</label>
                                            <input type="radio" id="answerC" name="answer" value="C" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerC">C</label>
                                            <input type="radio" id="answerD" name="answer" value="D" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerD">D</label>
                                        </div>
                                    )
                                    case "B": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="answerA" name="answer" value="A" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerA">A</label>
                                            <input type="radio" id="answerB" name="answer" value="B" checked onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerB">B</label>
                                            <input type="radio" id="answerC" name="answer" value="C" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerC">C</label>
                                            <input type="radio" id="answerD" name="answer" value="D" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerD">D</label>
                                        </div>
                                    )
                                    case "C": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="answerA" name="answer" value="A" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerA">A</label>
                                            <input type="radio" id="answerB" name="answer" value="B" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerB">B</label>
                                            <input type="radio" id="answerC" name="answer" value="C" checked onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerC">C</label>
                                            <input type="radio" id="answerD" name="answer" value="D" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerD">D</label>
                                        </div>
                                    )
                                    case "D": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="answerA" name="answer" value="A" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerA">A</label>
                                            <input type="radio" id="answerB" name="answer" value="B" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerB">B</label>
                                            <input type="radio" id="answerC" name="answer" value="C" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerC">C</label>
                                            <input type="radio" id="answerD" name="answer" value="D" checked onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerD">D</label>
                                        </div>
                                    )
                                    case "E": return (
                                        <div class="input-group-btn">
                                            <input type="radio" id="answerA" name="answer" value="A" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerA">A</label>
                                            <input type="radio" id="answerB" name="answer" value="B" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerB">B</label>
                                            <input type="radio" id="answerC" name="answer" value="C" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerC">C</label>
                                            <input type="radio" id="answerD" name="answer" value="D" onChange = {e => setAnswer(e.target.value)} />
                                            <label for="answerD">D</label>
                                        </div>
                                    )

                                }
                            }) ()
                                
                            }   
                    </div>

                    <div class="bottom-btns ml-3">
                        <input type="button" class="btn btn-danger float-end" id="btn-back" value="Cancel" onClick ={handleCancel} />
                        <input type="button" class="btn btn-primary" id="btn-ok-create" value="Done" onClick={handleSubmit} />
                    </div>
                </div>
          </div>
        </section>
);
}

export default UpdateQuestionStudent;